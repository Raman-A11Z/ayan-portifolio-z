import { supabase, SupabaseReview, fetchReviews as localFetchReviews, submitUserReview as localSubmitReview, submitLeadToSupabase as localSubmitLead } from './supabaseClient';
import { BLOG_POSTS, BlogPost as LocalBlogPost } from '../data/blogData';
import { TESTIMONIALS as LOCAL_TESTIMONIALS } from '../data/testimonialsData';
import { FAQ_ITEMS as LOCAL_FAQS } from '../data/faqData';
import { SERVICES as LOCAL_SERVICES } from '../data/servicesData';

// Public types (map DB rows to these structures)
export type BlogPost = LocalBlogPost;

// Fetch blog posts (published). Returns array shaped like data/blogData.BlogPost
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(100);
      if (!error && data) {
        // Map DB rows to frontend BlogPost shape when possible
        return (data as any[]).map((row) => ({
          id: row.id,
          slug: row.slug,
          title: row.title,
          category: row.categories?.[0] ?? 'Web Design',
          author: {
            name: row.author_name || 'Ayan',
            role: row.author_role || 'Founder & Chief Architect',
            avatar: row.cover_url || ''
          },
          publishedDate: row.published_at ? new Date(row.published_at).toLocaleDateString() : '',
          readTime: row.read_time || '5 min read',
          excerpt: row.excerpt || '',
          coverImage: row.cover_url || '',
          tags: row.tags || [],
          content: Array.isArray(row.content) ? row.content : [String(row.content || '')],
          relatedArticleIds: row.related_posts || [],
        }));
      }
    } catch (e) {
      console.warn('fetchBlogPosts supabase error', e);
    }
  }
  // Fallback to local static posts
  return BLOG_POSTS;
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).limit(1).single();
      if (!error && data) {
        const row = data as any;
        return {
          id: row.id,
          slug: row.slug,
          title: row.title,
          category: row.categories?.[0] ?? 'Web Design',
          author: {
            name: row.author_name || 'Ayan',
            role: row.author_role || 'Founder & Chief Architect',
            avatar: row.cover_url || ''
          },
          publishedDate: row.published_at ? new Date(row.published_at).toLocaleDateString() : '',
          readTime: row.read_time || '5 min read',
          excerpt: row.excerpt || '',
          coverImage: row.cover_url || '',
          tags: row.tags || [],
          content: Array.isArray(row.content) ? row.content : [String(row.content || '')],
          relatedArticleIds: row.related_posts || [],
        };
      }
    } catch (e) {
      console.warn('fetchBlogPostBySlug supabase error', e);
    }
  }
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

// Testimonials
export async function fetchTestimonials() {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    } catch (e) {
      console.warn('fetchTestimonials supabase error', e);
    }
  }
  return LOCAL_TESTIMONIALS;
}

export async function submitReview(payload: Partial<SupabaseReview>) {
  // Create text id fallback
  const id = payload.id || `rev-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const review: any = {
    ...payload,
    id,
    status: 'pending',
    verified: false,
    createdAt: new Date().toISOString().split('T')[0]
  };

  if (supabase) {
    try {
      const { error } = await supabase.from('reviews').insert([review]);
      if (!error) return { success: true };
    } catch (e) {
      console.warn('submitReview supabase error', e);
    }
  }

  // fallback to local submit helper
  await localSubmitReview(review as any);
  return { success: true, localOnly: true };
}

// FAQs
export async function fetchFAQs() {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('faqs').select('*').order('sort_order', { ascending: true });
      if (!error && data) return data;
    } catch (e) {
      console.warn('fetchFAQs supabase error', e);
    }
  }
  return LOCAL_FAQS;
}

// Services
export async function fetchServices() {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('services').select('*').order('sort_order', { ascending: true });
      if (!error && data) return data;
    } catch (e) {
      console.warn('fetchServices supabase error', e);
    }
  }
  return LOCAL_SERVICES;
}

// Contact messages
export async function submitContactMessage(payload: Record<string, any>) {
  const row = { ...payload, created_at: new Date().toISOString() };
  if (supabase) {
    try {
      const { data, error } = await supabase.from('contact_messages').insert([row]);
      if (!error) return { success: true, data };
    } catch (e) {
      console.warn('submitContactMessage supabase error', e);
    }
  }
  // Fallback: use generic local submit
  await localSubmitLead('contact_messages', row);
  return { success: true, localOnly: true };
}

// Bookings
export async function submitBooking(payload: Record<string, any>) {
  const row = { ...payload, created_at: new Date().toISOString(), status: 'pending' };
  if (supabase) {
    try {
      const { data, error } = await supabase.from('bookings').insert([row]);
      if (!error) return { success: true, data };
    } catch (e) {
      console.warn('submitBooking supabase error', e);
    }
  }
  await localSubmitLead('bookings', row);
  return { success: true, localOnly: true };
}

// Website & SEO settings
export async function fetchWebsiteSettings() {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('website_settings').select('*').limit(1).single();
      if (!error && data) return data;
    } catch (e) {
      console.warn('fetchWebsiteSettings supabase error', e);
    }
  }
  return null;
}

export async function fetchSEOSettings(page: string) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('seo_settings').select('*').eq('page', page).limit(1).single();
      if (!error && data) return data;
    } catch (e) {
      console.warn('fetchSEOSettings supabase error', e);
    }
  }
  return null;
}
