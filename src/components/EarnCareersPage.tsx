import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { soundFx } from '../utils/audio';
import { submitLeadToSupabase } from '../lib/supabaseClient';
import { SEOHead } from './SEOHead';
import { 
  Gift, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  Zap, 
  DollarSign, 
  Users, 
  PenTool, 
  Code2, 
  TrendingUp, 
  Layers, 
  Award, 
  HelpCircle,
  X,
  Send,
  CreditCard,
  UserCheck,
  FileText,
  Clock,
  CheckCircle,
  ShieldCheck,
  Lock,
  AlertCircle
} from 'lucide-react';

interface EarnCareersPageProps {
  currentTheme: ThemeId;
}

interface SubmissionItem {
  id: string;
  type: 'referral' | 'task' | 'job';
  title: string;
  applicantName: string;
  email: string;
  phone: string;
  upiId: string;
  details: string;
  submittedAt: string;
  status: 'Pending Review' | 'Verified & Processing' | 'Payout Approved';
}

export const EarnCareersPage: React.FC<EarnCareersPageProps> = ({ currentTheme }) => {
  const theme = THEMES[currentTheme] || THEMES['artisticFlair'] || THEMES['deepPurple'];
  const [activeTab, setActiveTab] = useState<'all' | 'referral' | 'tasks' | 'jobs'>('all');

  // Form Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFormType, setActiveFormType] = useState<'referral' | 'task' | 'job'>('referral');
  const [activeItemTitle, setActiveItemTitle] = useState('20% Client Referral Commission');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [lastRefId, setLastRefId] = useState('');

  // Local storage history state
  const [mySubmissions, setMySubmissions] = useState<SubmissionItem[]>([]);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    upiId: '',
    clientBudget: '₹50,000',
    details: '',
    notes: ''
  });

  // Load existing submissions from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aws_bounty_submissions');
      if (saved) {
        setMySubmissions(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const openSubmitModal = (type: 'referral' | 'task' | 'job', title: string) => {
    soundFx.playClick();
    setActiveFormType(type);
    setActiveItemTitle(title);
    setSubmitSuccess(false);
    setModalOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    setIsSubmitting(true);

    const newRefId = `AWS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newSubmission: SubmissionItem = {
      id: newRefId,
      type: activeFormType,
      title: activeItemTitle,
      applicantName: formData.name,
      email: formData.email,
      phone: formData.phone,
      upiId: formData.upiId || 'N/A',
      details: formData.details || `Budget: ${formData.clientBudget}. Notes: ${formData.notes}`,
      submittedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Pending Review'
    };

    await submitLeadToSupabase('bounty_jobs_submissions', {
      referenceId: newRefId,
      type: activeFormType,
      title: activeItemTitle,
      applicantName: formData.name,
      email: formData.email,
      phone: formData.phone,
      upiId: formData.upiId || 'N/A (Unpaid/Portfolio)',
      clientBudget: formData.clientBudget,
      details: formData.details || formData.notes
    });

    const updated = [newSubmission, ...mySubmissions];
    setMySubmissions(updated);
    try {
      localStorage.setItem('aws_bounty_submissions', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setLastRefId(newRefId);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    soundFx.playSuccess();
  };

  const referralCalc = [
    { clientBudget: '₹25,000', yourEarnings: '₹5,000' },
    { clientBudget: '₹50,000', yourEarnings: '₹10,000' },
    { clientBudget: '₹1,00,000', yourEarnings: '₹20,000' },
    { clientBudget: '₹2,50,000', yourEarnings: '₹50,000' }
  ];

  const earnTasks = [
    {
      id: 'task-lead',
      title: 'Client Referral Lead',
      reward: '20% Flat Commission',
      rewardDetail: 'Earn 20% of total project value after client payment',
      category: 'Referral Bounty',
      description: 'Connect any business, startup, or individual needing a modern website, e-commerce store, or web app to Ayan Web Studio.',
      icon: Gift,
      badgeColor: 'from-amber-400 to-amber-500 text-black',
      isClosed: false
    },
    {
      id: 'task-testing',
      title: 'Beta Testing & UX Feedback',
      reward: 'Closed (Slots Filled)',
      rewardDetail: 'Beta testing positions are currently filled',
      category: 'Micro-Bounty',
      description: 'Test newly launched web applications and submit feedback. (NOTE: Beta testing applications are currently closed).',
      icon: Lock,
      badgeColor: 'from-slate-600 to-slate-700 text-slate-300',
      isClosed: true
    },
    {
      id: 'task-content',
      title: 'Case Study & Article Writing',
      reward: 'Unpaid / Portfolio Credit',
      rewardDetail: 'Published article with author bio & experience certificate (No cash payout)',
      category: 'Content Writing',
      description: 'Draft technical case studies or SEO articles showcasing studio web builds. Published with your author bio for portfolio building.',
      icon: PenTool,
      badgeColor: 'from-purple-400 to-indigo-500 text-white',
      isClosed: false
    }
  ];

  const jobs = [
    {
      id: 'job-content-writer',
      title: 'Content Writer (SEO & Tech)',
      type: 'Part-Time / Remote',
      experience: '0 - 2 Years',
      stipend: 'Unpaid (Portfolio Credit & Certificate)',
      description: 'Write engaging, SEO-optimized web copy, technology blog articles, case studies, and studio landing page copy for author attribution and portfolio credit.',
      skills: ['SEO Copywriting', 'Technical Writing', 'Blog Editing', 'Brand Voice']
    },
    {
      id: 'job-frontend-dev',
      title: 'Frontend React Developer',
      type: 'Project-Based / Remote',
      experience: '1 - 3 Years',
      stipend: 'Unpaid (Industry Experience & Certificate)',
      description: 'Build responsive, sub-second, interactive React user interfaces using TypeScript, Tailwind CSS, GSAP, and Framer Motion for live portfolio credentials.',
      skills: ['React 18', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Responsive Design']
    },
    {
      id: 'job-growth-specialist',
      title: 'Social Media & Growth Specialist',
      type: 'Part-Time / Commission Based',
      experience: '0 - 2 Years',
      stipend: '20% Referral Commission per Client Lead',
      description: 'Manage Ayan Web Studio’s digital outreach, create engaging reels/posts, and reach out to prospective SMB clients across India.',
      skills: ['Social Media Marketing', 'Outreach', 'Lead Gen', 'Canva/Figma']
    },
    {
      id: 'job-uiux-designer',
      title: 'UI/UX Designer (Figma)',
      type: 'Project-Based / Remote',
      experience: '1+ Years',
      stipend: 'Unpaid (Portfolio Credit & Certificate)',
      description: 'Design modern, glassmorphic, mobile-first web & SaaS interfaces with clean typography, high contrast, and design system components.',
      skills: ['Figma', 'UI/UX Design', 'Glassmorphism', 'Design Systems']
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-16 relative overflow-hidden">
      <SEOHead
        title="Earn 20% Referral Commission & Careers • Ayan Web Studio"
        description="Refer client projects and get 20% flat commission paid after project completion. Explore earn tasks, content writing jobs, and developer positions."
      />

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-500/10 via-purple-600/10 to-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* ================================================== */}
      {/* PAGE HEADER                                        */}
      {/* ================================================== */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-cyan-500/20 border border-amber-400/40 text-xs font-mono text-amber-300 shadow-xl"
        >
          <Gift className="w-4 h-4 text-amber-300" />
          <span className="font-extrabold uppercase tracking-widest">20% REFERRAL COMMISSION & CAREERS</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Earn With <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>Ayan Web Studio</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 font-light text-base sm:text-lg leading-relaxed"
        >
          Refer clients to earn a <strong className="text-amber-300 font-bold">20% flat commission</strong> paid instantly after project completion. Complete micro-earn tasks or submit your application forms directly.
        </motion.p>

        {mySubmissions.length > 0 && (
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => {
                soundFx.playClick();
                setHistoryModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-lg"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>My Submissions ({mySubmissions.length})</span>
            </button>
          </div>
        )}
      </div>

      {/* ================================================== */}
      {/* FILTER TABS                                        */}
      {/* ================================================== */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {[
          { id: 'all', label: 'All Opportunities' },
          { id: 'referral', label: '🎁 20% Referral Program' },
          { id: 'tasks', label: '⚡ Micro-Earn Tasks' },
          { id: 'jobs', label: '💼 Jobs & Careers' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              soundFx.playClick();
              setActiveTab(tab.id as any);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-md ${
              activeTab === tab.id
                ? 'bg-amber-400 text-black shadow-amber-400/20 scale-105'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================================================== */}
      {/* 20% REFERRAL COMMISSION CARD (HIGHLIGHT)           */}
      {/* ================================================== */}
      {(activeTab === 'all' || activeTab === 'referral') && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-8 sm:p-12 rounded-3xl ${theme.glassStyle} border-2 border-amber-400/40 space-y-8 shadow-[0_0_60px_rgba(245,158,11,0.15)] relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-amber-300 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
                INSTANT PAYOUT AFTER PROJECT COMPLETION
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                20% Client Referral Commission Program
              </h2>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                Refer any business, brand, or entrepreneur who needs a professional website. Once the project is completed, you get 20% of the contract value directly transferred to your bank/UPI!
              </p>
            </div>

            <button
              onClick={() => openSubmitModal('referral', '20% Client Referral Commission')}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 hover:from-amber-300 hover:to-emerald-400 text-black font-extrabold text-sm flex items-center justify-center gap-3 transition-all shadow-xl hover:scale-105 active:scale-95 shrink-0"
            >
              <Send className="w-5 h-5 fill-black" />
              <span>Submit Client Referral Form</span>
            </button>
          </div>

          {/* Earnings Breakdown Table */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-bold text-amber-300 uppercase tracking-widest">
              Potential Referral Earnings Example
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {referralCalc.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Client Project Budget</span>
                  <div className="text-base sm:text-lg font-mono font-bold text-slate-200">{item.clientBudget}</div>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold block pt-1">Your 20% Commission</span>
                  <div className="text-xl sm:text-2xl font-mono font-black text-amber-300">{item.yourEarnings}</div>
                </div>
              ))}
            </div>
          </div>

          {/* How it works steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-amber-300">1. Share & Connect</span>
              <p className="text-xs text-slate-300">Tell a business owner or client about Ayan Web Studio and introduce them via WhatsApp.</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-300">2. We Build The Web App</span>
              <p className="text-xs text-slate-300">Our studio handles strategy, design, and sub-second React development with 100% satisfaction.</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-300">3. Instant 20% Payout</span>
              <p className="text-xs text-slate-300">Right after project delivery & final payment, your 20% referral commission is transferred directly to you.</p>
            </div>
          </div>

        </motion.div>
      )}

      {/* ================================================== */}
      {/* MICRO-EARN TASKS & BOUNTIES                       */}
      {/* ================================================== */}
      {(activeTab === 'all' || activeTab === 'tasks') && (
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest font-extrabold">
              BOUNTIES & TASKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Active Micro-Earn Tasks
            </h2>
            <p className="text-slate-300 text-sm font-light">
              Complete simple tasks and earn rewards directly paid to your UPI / Bank.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {earnTasks.map((task) => (
              <div
                key={task.id}
                className={`p-6 rounded-2xl ${theme.glassStyle} border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between space-y-6 shadow-xl group`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-white/10 text-slate-200">
                      {task.category}
                    </span>
                    <task.icon className="w-5 h-5 text-amber-300" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors">
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {task.description}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Reward</span>
                    <div className="text-lg font-mono font-black text-amber-300">{task.reward}</div>
                    <span className="text-[10px] font-mono text-slate-300 block">{task.rewardDetail}</span>
                  </div>
                </div>

                {task.isClosed ? (
                  <button
                    disabled
                    className="w-full py-3 px-4 rounded-xl bg-slate-800/80 border border-slate-700/50 text-slate-400 text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-not-allowed opacity-80"
                  >
                    <Lock className="w-4 h-4 text-slate-400" />
                    <span>Closed - Positions Filled</span>
                  </button>
                ) : (
                  <button
                    onClick={() => openSubmitModal('task', task.title)}
                    className="w-full py-3 px-4 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 hover:text-cyan-200 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span>Submit Draft / Article Form</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* CAREERS & OPEN POSITIONS                           */}
      {/* ================================================== */}
      {(activeTab === 'all' || activeTab === 'jobs') && (
        <div className="space-y-8 pt-8 border-t border-white/10">
          <div className="space-y-2">
            <span className="text-xs font-mono text-purple-300 uppercase tracking-widest font-extrabold">
              JOIN AYAN WEB STUDIO
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Open Positions & Roles
            </h2>
            <p className="text-slate-300 text-sm font-light">
              Looking for Content Writers, Frontend Developers, UI Designers & Growth Specialists. Remote & project-based opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`p-6 sm:p-7 rounded-2xl ${theme.glassStyle} border border-white/10 hover:border-purple-400/40 transition-all flex flex-col justify-between space-y-6 shadow-xl group`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 border border-purple-400/30 text-purple-300">
                        {job.type}
                      </span>
                      <h3 className="text-xl font-extrabold text-white group-hover:text-purple-300 transition-colors">
                        {job.title}
                      </h3>
                    </div>
                    <Briefcase className="w-6 h-6 text-purple-400 shrink-0" />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-2 border-t border-white/10">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Experience</span>
                      <span className="font-bold text-amber-300">{job.experience}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Compensation</span>
                      <span className="font-bold text-emerald-300">{job.stipend}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest block">Required Skills</span>
                    <div className="flex flex-wrap gap-1.5">
                      {job.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openSubmitModal('job', job.title)}
                  className="w-full py-3 px-4 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-200 font-extrabold text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-102"
                >
                  <UserCheck className="w-4 h-4 text-purple-300" />
                  <span>Fill Application Form</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* DIRECT ASSISTANCE                                  */}
      {/* ================================================== */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-black/60 to-slate-950/40 border border-emerald-500/30 text-center space-y-4">
        <h3 className="text-2xl font-extrabold text-white">
          Questions About Referral Bounties or Jobs?
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-light">
          Submit your referral or application form directly using the options above. All submissions are logged securely and processed within 24 hours.
        </p>
      </div>

      {/* ================================================== */}
      {/* SUBMISSION FORM MODAL                              */}
      {/* ================================================== */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/20 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitSuccess ? (
                <>
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">
                      {activeFormType === 'referral' ? '20% Referral Submission' : activeFormType === 'task' ? 'Article / Content Submission' : 'Job Application'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white pt-1">
                      {activeItemTitle}
                    </h2>
                    <p className="text-xs text-slate-300">
                      Fill out the form below. Your submission will be recorded securely.
                    </p>
                  </div>

                  <form onSubmit={handleSubmitForm} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-slate-300 block">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-slate-300 block">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. rahul@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className={activeFormType === 'referral' ? '' : 'sm:col-span-2'}>
                        <label className="text-[11px] font-mono text-slate-300 block">Phone / WhatsApp Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      {activeFormType === 'referral' && (
                        <div className="space-y-1">
                          <label className="text-[11px] font-mono text-slate-300 block font-bold">
                            UPI ID / Bank Detail for 20% Payout *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.upiId}
                            onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                            placeholder="e.g. rahul@upi"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      )}
                    </div>

                    {activeFormType === 'referral' && (
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-slate-300 block">Referred Client Project Budget</label>
                        <select
                          value={formData.clientBudget}
                          onChange={(e) => setFormData({ ...formData, clientBudget: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                        >
                          <option value="₹25,000">₹25,000 Project (Your 20%: ₹5,000)</option>
                          <option value="₹50,000">₹50,000 Project (Your 20%: ₹10,000)</option>
                          <option value="₹1,00,000">₹1,00,000 Project (Your 20%: ₹20,000)</option>
                          <option value="₹2,50,000+">₹2,50,000+ Enterprise (Your 20%: ₹50,000+)</option>
                        </select>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-300 block">
                        {activeFormType === 'referral'
                          ? 'Referred Client Name & Project Details *'
                          : activeFormType === 'task'
                          ? 'Task Deliverables / UX Audit Feedback *'
                          : 'Portfolio Link / Resume Summary *'}
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder={
                          activeFormType === 'referral'
                            ? 'e.g. Client: Sharma Clinic, Patna. Needs dental appointment booking website.'
                            : activeFormType === 'task'
                            ? 'e.g. Link to my QA feedback report or usability audit summary'
                            : 'e.g. Portfolio / GitHub / Past Work experience summary'
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 hover:from-amber-300 hover:to-emerald-400 text-black font-extrabold text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Logging Submission...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4 fill-black" />
                            <span>Submit Form Now</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-6 space-y-5">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-white">Submission Logged!</h3>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Your referral / bounty application has been saved. Reference Tracking ID:
                    </p>
                    <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono font-black text-lg inline-block">
                      {lastRefId}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left text-xs text-slate-300 space-y-1">
                    {activeFormType === 'referral' ? (
                      <>
                        <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Saved & Prepared for Verification</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Payout UPI ID: <span className="text-white font-mono">{formData.upiId}</span>. Founder Ayan will review your entry and issue payout upon verification.
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-cyan-400 font-bold font-mono">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Application Submitted Successfully</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Founder Ayan will review your application. Selected candidates will be notified via email with author credits and experience certificate.
                        </p>
                      </>
                    )}
                  </div>

                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setModalOpen(false);
                        setHistoryModalOpen(true);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono font-bold text-xs"
                    >
                      View My Submissions ({mySubmissions.length})
                    </button>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================================================== */}
      {/* MY SUBMISSIONS HISTORY MODAL                       */}
      {/* ================================================== */}
      <AnimatePresence>
        {historyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/20 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setHistoryModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider px-2.5 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/30">
                  Submission History
                </span>
                <h2 className="text-2xl font-extrabold text-white">
                  My Submitted Bounties & Referrals
                </h2>
                <p className="text-xs text-slate-300">
                  Your submitted entries saved locally in browser state.
                </p>
              </div>

              <div className="space-y-3">
                {mySubmissions.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-white/10 rounded-2xl">
                    No submissions logged yet. Use the buttons above to submit client referrals or claims!
                  </div>
                ) : (
                  mySubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-left"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-amber-300">{sub.id}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/10 border border-amber-400/30 text-amber-300">
                          {sub.status}
                        </span>
                      </div>

                      <div className="text-sm font-bold text-white">{sub.title}</div>
                      <p className="text-xs text-slate-300 font-mono">{sub.details}</p>

                      <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-white/10">
                        <span>Applicant: {sub.applicantName} ({sub.phone})</span>
                        <span>Payout UPI: {sub.upiId}</span>
                        <span>Date: {sub.submittedAt}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setHistoryModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 text-black font-bold text-xs font-mono"
                >
                  Close Portal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
