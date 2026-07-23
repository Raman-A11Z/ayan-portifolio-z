import ayanAvatar from '../assets/images/ayan_founder_portrait_1784795466652.jpg';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Web Design' | 'Performance' | 'SEO & Growth' | '3D & WebGL';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  content: string[];
  relatedArticleIds: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'core-web-vitals-guide-2026',
    title: 'Why Sub-Second Page Speed is Non-Negotiable for Business Growth in 2026',
    category: 'Performance',
    author: {
      name: 'Ayan',
      role: 'Founder & Chief Architect',
      avatar: ayanAvatar
    },
    publishedDate: '18 July 2026',
    readTime: '5 min read',
    excerpt: 'How optimizing Interaction to Next Paint (INP) and Largest Contentful Paint (LCP) directly improves conversion rates and Google search rankings for modern business websites.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    tags: ['Core Web Vitals', 'Website Speed', 'SEO', 'Conversion Rate'],
    content: [
      'In today’s fast-paced digital ecosystem, page speed is no longer just a technical metric—it is a core business differentiator. Studies show that a delay of just 1 second in mobile load times can decrease conversion rates by up to 20%.',
      'At Ayan Web Studio, every single website is engineered from the ground up using React, Vite, and modern bundle optimization to guarantee a 100/100 Core Web Vitals score on Google Lighthouse.',
      'Key Optimization Strategies We Deploy:',
      '1. Dynamic Code Splitting: Loading only necessary JS chunks for the active route.',
      '2. Modern Image Pipelines: Serving WebP/AVIF images with explicit width and height aspect ratios to eliminate Cumulative Layout Shift (CLS).',
      '3. Edge CDN Caching: Distributing static assets on global edge servers so requests resolve sub-second anywhere in India and worldwide.',
      'By prioritizing speed during design, your business builds instant trust with visitors and gains an advantage in Google Search Engine Result Pages (SERPs).'
    ],
    relatedArticleIds: ['post-2', 'post-3']
  },
  {
    id: 'post-2',
    slug: 'custom-web-design-vs-templates',
    title: 'Custom Web Development vs. Templates: Which Offers Better ROI for Businesses?',
    category: 'Web Design',
    author: {
      name: 'Ayan',
      role: 'Founder & Chief Architect',
      avatar: ayanAvatar
    },
    publishedDate: '10 June 2026',
    readTime: '6 min read',
    excerpt: 'A comprehensive financial and technical breakdown comparing off-the-shelf website templates with bespoke React/TypeScript builds for long-term brand equity.',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
    tags: ['Custom Design', 'ROI', 'Web Architecture', 'Brand Identity'],
    content: [
      'Many small and medium enterprises start with off-the-shelf CMS templates due to low initial costs. However, bloat from heavy plugins, rigid design limitations, and sluggish performance often lead to costly rebuilds within 12 months.',
      'Custom web development gives your company a tailormade digital asset. You own 100% of the clean source code with zero monthly software dependencies.',
      'Benefits of Custom Built Architecture:',
      '• Bespoke UX tailored to your precise customer conversion funnel.',
      '• Unmatched security with zero reliance on vulnerable third-party plugins.',
      '• Unlimited scalability—add custom portals, calculators, or payment integrations whenever needed.',
      'Investing in a bespoke web experience ensures your digital storefront reflects the true quality of your business.'
    ],
    relatedArticleIds: ['post-1', 'post-3']
  },
  {
    id: 'post-3',
    slug: '3d-webgl-micro-interactions-ux',
    title: 'Elevating Brand Identity with 3D WebGL and Tactile Audio Feedback',
    category: '3D & WebGL',
    author: {
      name: 'Ayan',
      role: 'Founder & Chief Architect',
      avatar: ayanAvatar
    },
    publishedDate: '02 May 2026',
    readTime: '4 min read',
    excerpt: 'How integrating subtle 3D geometries, glassmorphic UI, and audio micro-interactions creates memorable digital brand experiences.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    tags: ['Three.js', '3D Design', 'User Experience', 'Micro-Interactions'],
    content: [
      'Web browsers are now capable of rendering real-time 3D environments at 60 FPS. Incorporating interactive 3D logo monoliths, floating geometries, and subtle ambient particle effects transforms static websites into engaging experiences.',
      'At Ayan Web Studio, we combine Three.js shaders with non-intrusive audio tactile feedback to make clicking, toggling, and navigating feel tactile and premium.',
      'Key Design Principles:',
      '• Performance-First 3D: Rendering low-poly models with custom shaders to preserve mobile frame rates.',
      '• Subtle Elegance: Using 3D as an aesthetic enhancement rather than a distraction from core calls-to-action.',
      '• Accessibility: Providing fallback 2D rendering for reduced-motion settings.',
      'Explore our interactive 3D Brand Lab on the home page to see these principles in action.'
    ],
    relatedArticleIds: ['post-1', 'post-2']
  }
];
