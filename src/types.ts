export type ThemeId = 
  | 'artisticFlair'
  | 'luxury' 
  | 'cyberpunk' 
  | 'glass' 
  | 'minimal' 
  | 'apple' 
  | 'space' 
  | 'deepPurple';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  bgClass: string;
  surfaceClass: string;
  textPrimary: string;
  textSecondary: string;
  accentGlow: string;
  accentBorder: string;
  accentGradient: string;
  primaryColorHex: string;
  secondaryColorHex: string;
  glassStyle: string;
  badgeStyle: string;
}

export type LogoVariant = 'flat' | '3d' | 'glass' | 'metal' | 'kinetic';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  iconName: string;
  shape3d: 'cube' | 'torus' | 'pyramid' | 'sphere' | 'prism' | 'cylinder' | 'knot';
  accentColor: string;
  glowColor: string;
  regularPriceINR: number;
  offerPriceINR: number;
  regularPriceUSD: number;
  offerPriceUSD: number;
  launchOfferLabel?: string;
  isCustomQuote?: boolean;
  idealFor: string;
  perfectForList: string[];
  featuresList: string[];
  deliverables: string[];
  techStack: string[];
  inrStartingPrice: number;
  usdStartingPrice: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  industry: string;
  location: string;
  year: string;
  category: 'Landing Page' | 'Business Web' | 'E-Commerce' | 'Custom SaaS' | '3D Experience';
  description: string;
  stats: { label: string; value: string }[];
  tags: string[];
  image: string;
  beforeImage?: string;
  afterImage?: string;
  lighthouseScore: { performance: number; accessibility: number; seo: number };
  liveUrl?: string;
}

export interface EstimatorState {
  serviceId: string;
  scope: 'MVP' | 'Standard' | 'Enterprise';
  timeline: 'Rush (2 Weeks)' | 'Standard (4 Weeks)' | 'Flexible (6-8 Weeks)';
  features: string[];
  currency: 'INR' | 'USD';
  addons: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  rating: number;
}
