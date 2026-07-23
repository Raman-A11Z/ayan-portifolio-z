import ayanAvatar from '../assets/images/ayan_founder_portrait_1784795466652.jpg';
import deepakAvatar from '../assets/images/deepak_frontend_expert_1784795483388.jpg';
import mayankAvatar from '../assets/images/mayank_backend_expert_1784795497087.jpg';
import shreyaAvatar from '../assets/images/shreya_qa_consultant_expert_1784795513487.jpg';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  skills: string[];
  experienceHighlights: string[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
  };
}

export interface CultureCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TeamStatistic {
  id: string;
  label: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  description: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ayan',
    name: 'Ayan',
    role: 'Founder & Chief Architect',
    avatar: ayanAvatar,
    bio: 'Ayan founded Ayan Web Studio with the vision of creating premium websites that combine exceptional design, modern technology, and business-focused solutions. He leads project planning, UI/UX strategy, frontend architecture, and ensures every project meets high standards of quality, performance, and user experience.',
    skills: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'GSAP',
      'Framer Motion',
      'UI/UX Design',
      'Frontend Architecture',
      'Project Planning'
    ],
    experienceHighlights: [
      'Founder & Studio Director',
      'UI/UX Architecture Specialist',
      'Sub-second Performance Pioneer'
    ],
    socialLinks: {}
  },
  {
    id: 'deepak',
    name: 'Deepak',
    role: 'Frontend Web Developer',
    avatar: deepakAvatar,
    bio: 'Deepak focuses on building responsive, interactive, and pixel-perfect user interfaces. His expertise ensures every website delivers a smooth experience across desktop, tablet, and mobile devices while maintaining clean and maintainable code.',
    skills: [
      'React',
      'HTML',
      'CSS',
      'JavaScript',
      'Responsive Design',
      'Tailwind CSS',
      'Frontend Development'
    ],
    experienceHighlights: [
      'Pixel-Perfect UI Specialist',
      'Cross-Browser & Fluid Layouts',
      '50+ Mobile-First Web Builds'
    ],
    socialLinks: {}
  },
  {
    id: 'mayank',
    name: 'Mayank',
    role: 'Backend Architect',
    avatar: mayankAvatar,
    bio: 'Mayank specializes in backend architecture, databases, authentication, APIs, and scalable application development. He designs secure systems that support reliable performance and future business growth.',
    skills: [
      'Supabase',
      'PostgreSQL',
      'Authentication',
      'REST APIs',
      'Database Design',
      'Backend Architecture',
      'Security'
    ],
    experienceHighlights: [
      'Cloud Architecture & PostgreSQL',
      'High-Concurrency API Design',
      'Supabase & Auth Security Expert'
    ],
    socialLinks: {}
  },
  {
    id: 'shreya',
    name: 'Shreya',
    role: 'Technical Consultant',
    avatar: shreyaAvatar,
    bio: 'Shreya contributes technical planning, project coordination, quality review, and solution consulting. She helps ensure that every project aligns with business goals while maintaining high development standards.',
    skills: [
      'Technical Consulting',
      'Quality Assurance',
      'Project Coordination',
      'System Analysis',
      'Client Communication',
      'Planning'
    ],
    experienceHighlights: [
      'Solution Consulting & Planning',
      'Agile Project Coordination',
      'Core Web Vitals Quality Audit'
    ],
    socialLinks: {}
  }
];

export const CULTURE_CARDS: CultureCard[] = [
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'Using modern technology to build future-ready websites.',
    iconName: 'Cpu'
  },
  {
    id: 'quality',
    title: 'Quality',
    description: 'Every project receives careful attention to detail.',
    iconName: 'Award'
  },
  {
    id: 'transparency',
    title: 'Transparency',
    description: 'Clear communication throughout the project.',
    iconName: 'Eye'
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'Fast, optimized, and scalable solutions.',
    iconName: 'Zap'
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Following modern development and security best practices.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'support',
    title: 'Support',
    description: 'Helping clients even after successful project delivery.',
    iconName: 'Headphones'
  }
];

export const TEAM_STATISTICS: TeamStatistic[] = [
  {
    id: 'projects',
    label: 'Projects Completed',
    value: 45,
    suffix: '+',
    description: 'Delivered for businesses across India with sub-second performance.'
  },
  {
    id: 'clients',
    label: 'Happy Clients',
    value: 40,
    suffix: '+',
    description: '100% satisfaction across e-commerce, corporate, and tech brands.'
  },
  {
    id: 'support',
    label: 'Support Response',
    value: '< 15',
    suffix: ' Min',
    description: 'Ultra-fast emergency response SLA for all active support plans.'
  },
  {
    id: 'tech',
    label: 'Technologies Used',
    value: 18,
    suffix: '+',
    description: 'Modern stack including React, TypeScript, Tailwind, Supabase & GSAP.'
  },
  {
    id: 'learning',
    label: 'Years of Continuous Learning',
    value: 5,
    suffix: '+',
    description: 'Constantly upgrading architectures to meet top global standards.'
  }
];
