import { PortfolioProject, Testimonial } from '../types';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'kuber-fintech',
    title: 'Kuber Capital Digital Banking Platform',
    client: 'Kuber Capital Pvt Ltd',
    industry: 'Fintech & Wealth Management',
    location: 'Mumbai, India',
    year: '2025',
    category: 'Custom SaaS',
    description: 'A revolutionary fintech wealth management platform built for High-Net-Worth Indian investors. Features real-time portfolio analytics, biometric authentication, and custom 3D asset performance visualizers.',
    stats: [
      { label: 'AUM Onboarded', value: '₹4,200 Cr+' },
      { label: 'Conversion Lift', value: '+340%' },
      { label: 'Page Speed', value: '0.28s' }
    ],
    tags: ['Fintech', 'React 19', 'Three.js Data Vis', 'Razorpay API', 'Security ISO27001'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    lighthouseScore: { performance: 100, accessibility: 98, seo: 100 }
  },
  {
    id: 'veda-luxury',
    title: 'Veda Living Architectural Showcase',
    client: 'Veda Estates & Hospitality',
    industry: 'Luxury Real Estate',
    location: 'Bengaluru / Goa, India',
    year: '2025',
    category: '3D Experience',
    description: 'Cinematic 3D virtual walkthrough & luxury estate showcase website. Integrates WebGL property rotators, ambient audio scores, and direct WhatsApp VIP concierge scheduling.',
    stats: [
      { label: 'Villas Sold', value: '₹180 Cr+' },
      { label: 'Avg Session Time', value: '6m 42s' },
      { label: 'Inquiry Rate', value: '18.4%' }
    ],
    tags: ['Real Estate', 'Three.js WebGL', 'Tailwind', 'Motion', 'WhatsApp VIP'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
    lighthouseScore: { performance: 99, accessibility: 100, seo: 100 }
  },
  {
    id: 'aura-d2c',
    title: 'Aura Botanicals D2C Experience',
    client: 'Aura Organic Essentials',
    industry: 'D2C E-Commerce',
    location: 'New Delhi, India',
    year: '2026',
    category: 'E-Commerce',
    description: 'Headless Shopify e-commerce platform with sub-second product pages, custom fragrance customizers, instant UPI checkout, and automated WhatsApp order tracking.',
    stats: [
      { label: 'Monthly Orders', value: '45,000+' },
      { label: 'Checkout Speed', value: '1.2s' },
      { label: 'Revenue Growth', value: '4.8x' }
    ],
    tags: ['Headless Shopify', 'React', 'Tailwind', 'UPI Gateway', 'WhatsApp Flow'],
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
    lighthouseScore: { performance: 100, accessibility: 96, seo: 100 }
  },
  {
    id: 'zyra-ai',
    title: 'Zyra AI Intelligence Cloud',
    client: 'Zyra Technologies',
    industry: 'Artificial Intelligence & SaaS',
    location: 'Hyderabad, India / San Francisco, USA',
    year: '2026',
    category: 'Custom SaaS',
    description: 'High-conversion SaaS marketing portal & interactive dashboard for an enterprise AI platform. Features reactive canvas shaders, code playbooks, and dark luxury aesthetics.',
    stats: [
      { label: 'Signups Month 1', value: '12,500+' },
      { label: 'Lighthouse Score', value: '100/100' },
      { label: 'Global Ranking', value: '#1 ProductHunt' }
    ],
    tags: ['AI SaaS', 'Vite', 'Three.js Shaders', 'Express API', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    lighthouseScore: { performance: 100, accessibility: 100, seo: 100 }
  },
  {
    id: 'bharat-logistics',
    title: 'Bharat D2C Supply Chain Command',
    client: 'Bharat Logistics Corp',
    industry: 'Supply Chain & B2B Logistics',
    location: 'Gurugram, India',
    year: '2025',
    category: 'Business Web',
    description: 'Enterprise web platform for a major pan-India logistics network. Features interactive freight cost calculators, fleet tracking visualizers, and enterprise B2B lead capture.',
    stats: [
      { label: 'Enterprise Leads', value: '+520%' },
      { label: 'Fleet Nodes Tracked', value: '15,000+' },
      { label: 'Uptime SLA', value: '99.99%' }
    ],
    tags: ['B2B Enterprise', 'Next.js', 'Google Maps API', 'Tailwind', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    lighthouseScore: { performance: 98, accessibility: 99, seo: 100 }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "Ayan Web Studio transformed our digital presence into an absolute masterpiece. Our investor conversion shot up by 340% shortly after launch. Their attention to detail and 3D craftsmanship is world-class.",
    author: "Vikramaditya Singhania",
    role: "Managing Director",
    company: "Kuber Capital Pvt Ltd",
    location: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5
  },
  {
    id: '2',
    quote: "Working with Ayan Web Studio felt like collaborating with Apple’s design team. They didn't just build a website; they forged our brand's luxury identity. The 3D property viewer is selling multi-crore villas for us effortlessly.",
    author: "Ananya Deshmukh",
    role: "Chief Marketing Officer",
    company: "Veda Living Estates",
    location: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    rating: 5
  },
  {
    id: '3',
    quote: "Speed, design elegance, and zero compromises. Ayan Web Studio delivered our headless store in record time with a 100/100 Lighthouse performance rating. Our D2C brand processing 45,000+ monthly orders runs flawlessly.",
    author: "Rohan Kapoor",
    role: "Founder & CEO",
    company: "Aura Essentials",
    location: "New Delhi",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    rating: 5
  }
];
