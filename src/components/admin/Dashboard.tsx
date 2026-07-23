import React, { useEffect, useState } from 'react';
import { fetchBlogPosts, fetchTestimonials, fetchWebsiteSettings } from '../../lib/cms';

export const Dashboard: React.FC = () => {
  const [postsCount, setPostsCount] = useState<number | null>(null);
  const [testimonialsCount, setTestimonialsCount] = useState<number | null>(null);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const posts = await fetchBlogPosts();
      setPostsCount(posts?.length ?? 0);
      const t = await fetchTestimonials();
      setTestimonialsCount(t?.length ?? 0);
      const s = await fetchWebsiteSettings();
      setSettings(s || null);
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded bg-white/3 border border-white/6">
          <div className="text-xs text-slate-400">Published Posts</div>
          <div className="text-2xl font-bold text-white">{postsCount ?? '—'}</div>
        </div>

        <div className="p-4 rounded bg-white/3 border border-white/6">
          <div className="text-xs text-slate-400">Testimonials</div>
          <div className="text-2xl font-bold text-white">{testimonialsCount ?? '—'}</div>
        </div>

        <div className="p-4 rounded bg-white/3 border border-white/6">
          <div className="text-xs text-slate-400">Site Settings</div>
          <div className="text-2xl font-bold text-white">{settings ? 'Configured' : 'Not configured'}</div>
        </div>
      </div>

      <div className="p-4 rounded bg-white/3 border border-white/6">
        <h2 className="text-lg font-bold text-white mb-2">Quick Actions</h2>
        <div className="flex gap-2">
          <a href="/admin/blog" className="px-3 py-2 rounded bg-amber-400 text-black text-sm">Manage Blog</a>
          <a href="/admin/media" className="px-3 py-2 rounded bg-cyan-400 text-black text-sm">Open Media Library</a>
        </div>
      </div>
    </div>
  );
};
