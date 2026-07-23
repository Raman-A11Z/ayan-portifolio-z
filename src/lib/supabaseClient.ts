import { createClient } from '@supabase/supabase-js';

// Read Supabase environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client if configured
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface SupabaseReview {
  id: string;
  clientName: string;
  company: string;
  role: string;
  rating: number;
  reviewText: string;
  projectType: string;
  verified: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  avatar?: string;
}

const LOCAL_STORAGE_REVIEWS_KEY = 'aws_supabase_reviews';

// Seed initial verified reviews if empty
const INITIAL_REVIEWS: SupabaseReview[] = [
  {
    id: 'rev-1',
    clientName: 'Vikramaditya Singhania',
    company: 'Kuber Capital Pvt Ltd',
    role: 'Managing Director',
    rating: 5,
    reviewText: 'Ayan Web Studio transformed our digital presence into an absolute masterpiece. Our investor conversion shot up by 340% shortly after launch. Their attention to detail and 3D craftsmanship is world-class.',
    projectType: 'Corporate FinTech Portal',
    verified: true,
    status: 'approved',
    createdAt: '2026-06-15',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-2',
    clientName: 'Ananya Deshmukh',
    company: 'Veda Living Estates',
    role: 'Chief Marketing Officer',
    rating: 5,
    reviewText: "Working with Ayan Web Studio felt like collaborating with Apple's design team. They forged our brand's luxury identity. The 3D property viewer is selling multi-crore villas for us effortlessly.",
    projectType: 'Real Estate 3D Portal',
    verified: true,
    status: 'approved',
    createdAt: '2026-06-28',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-3',
    clientName: 'Rohan Kapoor',
    company: 'Aura Essentials',
    role: 'Founder & CEO',
    rating: 5,
    reviewText: 'Speed, design elegance, and zero compromises. Ayan Web Studio delivered our headless store with a 100/100 Lighthouse performance rating. Processing 45,000+ monthly orders flawlessly.',
    projectType: 'Headless E-Commerce',
    verified: true,
    status: 'approved',
    createdAt: '2026-07-02',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  }
];

// Get all reviews (combining Supabase or LocalStorage fallback)
export async function fetchReviews(): Promise<SupabaseReview[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('createdAt', { ascending: false });
      if (!error && data) return data as SupabaseReview[];
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to local storage:', e);
    }
  }

  // Fallback to Local Storage
  const stored = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(INITIAL_REVIEWS));
    return INITIAL_REVIEWS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_REVIEWS;
  }
}

// Submit a new review (starts as 'pending' for admin approval)
export async function submitUserReview(reviewData: Omit<SupabaseReview, 'id' | 'createdAt' | 'status' | 'verified'>): Promise<{ success: boolean; review: SupabaseReview }> {
  const newReview: SupabaseReview = {
    ...reviewData,
    id: `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    status: 'pending',
    verified: false,
    createdAt: new Date().toISOString().split('T')[0]
  };

  if (supabase) {
    try {
      await supabase.from('reviews').insert([newReview]);
    } catch (e) {
      console.warn('Supabase insert failed, saving locally:', e);
    }
  }

  // Save to local storage
  const existing = await fetchReviews();
  const updated = [newReview, ...existing];
  localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(updated));

  return { success: true, review: newReview };
}

// Admin approve or reject a review
export async function updateReviewStatus(reviewId: string, status: 'approved' | 'rejected'): Promise<SupabaseReview[]> {
  if (supabase) {
    try {
      await supabase.from('reviews').update({ status, verified: status === 'approved' }).eq('id', reviewId);
    } catch (e) {
      console.warn('Supabase update status failed:', e);
    }
  }

  const existing = await fetchReviews();
  const updated = existing.map(r => r.id === reviewId ? { ...r, status, verified: status === 'approved' } : r);
  localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(updated));
  return updated;
}

// Generic Supabase Lead / Form Logger
export async function submitLeadToSupabase(tableName: string, payload: Record<string, any>) {
  console.log(`[Supabase Lead Logger] Table: ${tableName}`, payload);
  if (supabase) {
    try {
      const { data, error } = await supabase.from(tableName).insert([payload]);
      if (error) console.warn(`Supabase ${tableName} error:`, error);
      return { success: !error, data };
    } catch (e) {
      console.warn(`Supabase ${tableName} submission exception:`, e);
    }
  }

  // Backup to localStorage
  const key = `aws_lead_${tableName}`;
  const prev = JSON.parse(localStorage.getItem(key) || '[]');
  localStorage.setItem(key, JSON.stringify([{ ...payload, timestamp: new Date().toISOString() }, ...prev]));
  return { success: true, localOnly: true };
}
