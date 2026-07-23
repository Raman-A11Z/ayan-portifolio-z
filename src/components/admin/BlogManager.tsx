import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { fetchBlogPosts } from '../../lib/cms';

interface PostForm {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string;
  published: boolean;
  published_at?: string;
}

export const BlogManager: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<PostForm>({ slug: '', title: '', excerpt: '', content: '', tags: '', published: false });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    const data = await fetchBlogPosts();
    setPosts(data as any[] || []);
    setLoading(false);
  }

  const handleEdit = (p: any) => {
    setForm({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt || '',
      content: Array.isArray(p.content) ? (p.content as string[]).join('\n\n') : String(p.content || ''),
      tags: (p.tags || []).join(', '),
      published: Boolean(p.published),
      published_at: p.published_at || undefined
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return setMessage('Supabase not configured');
    if (!confirm('Delete this post?')) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) return setMessage(error.message);
    setMessage('Deleted');
    await loadPosts();
  };

  const handleUploadCover = async (file: File) => {
    if (!supabase) throw new Error('Supabase not configured');
    const path = `blog/covers/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.\-\_]/g, '')}`;
    const { error: uploadError } = await supabase.storage.from('blog').upload(path, file, { cacheControl: '3600', upsert: false });
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('blog').getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!supabase) return setMessage('Supabase not configured');
    setLoading(true);
    try {
      let cover_url = undefined;
      if (coverFile) {
        cover_url = await handleUploadCover(coverFile);
      }

      const payload: any = {
        slug: form.slug,
        title: form.title,
        excerpt: form.excerpt,
        content: (form.content || '').split('\n\n'),
        cover_url: cover_url || null,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()) : [],
        published: form.published,
        published_at: form.published ? new Date().toISOString() : null
      };

      if (form.id) {
        const { error } = await supabase.from('blog_posts').update(payload).eq('id', form.id);
        if (error) throw error;
        setMessage('Updated post');
      } else {
        const { error } = await supabase.from('blog_posts').insert([payload]);
        if (error) throw error;
        setMessage('Created post');
      }

      setForm({ slug: '', title: '', excerpt: '', content: '', tags: '', published: false });
      setCoverFile(null);
      await loadPosts();
    } catch (e: any) {
      setMessage(e?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-4">Blog Manager</h1>

      {message && <div className="p-3 mb-3 rounded bg-white/5 text-xs text-amber-300">{message}</div>}

      <form onSubmit={handleSubmit} className="p-4 rounded bg-white/3 border border-white/6 mb-6 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input placeholder="Slug (unique)" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="px-3 py-2 rounded bg-black/60 border border-white/10 text-white" />
          <input placeholder="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="px-3 py-2 rounded bg-black/60 border border-white/10 text-white" />
        </div>

        <input placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-white" />

        <textarea placeholder="Content (use blank line to separate paragraphs)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full h-40 px-3 py-2 rounded bg-black/60 border border-white/10 text-white" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="px-3 py-2 rounded bg-black/60 border border-white/10 text-white" />
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            <span>Publish</span>
          </label>

          <div>
            <label className="text-xs text-slate-300 block">Cover Image</label>
            <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)} className="text-xs text-slate-300" />
          </div>
        </div>

        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="px-3 py-2 rounded bg-amber-400 text-black">Save Post</button>
          <button type="button" onClick={() => { setForm({ slug: '', title: '', excerpt: '', content: '', tags: '', published: false }); setCoverFile(null); }} className="px-3 py-2 rounded bg-white/5 text-slate-300">Reset</button>
        </div>
      </form>

      <div>
        <h2 className="text-lg font-bold text-white mb-3">Existing Posts</h2>
        {loading && <div>Loading...</div>}
        <div className="grid gap-3">
          {posts.map((p: any) => (
            <div key={p.id || p.slug} className="p-3 rounded bg-white/3 border border-white/6 flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-300">{p.title}</div>
                <div className="text-xs text-slate-400">/{p.slug} • {p.readTime || ''}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="px-2 py-1 rounded bg-white/5 text-xs">Edit</button>
                {p.id && <button onClick={() => handleDelete(p.id)} className="px-2 py-1 rounded bg-red-600 text-xs text-black">Delete</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
