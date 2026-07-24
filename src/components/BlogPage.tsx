import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { fetchBlogPosts, fetchBlogPostBySlug, BlogPost } from '../lib/cms';
import { soundFx } from '../utils/audio';
import { SEOHead } from './SEOHead';
import { Search, Calendar, Clock, ArrowRight, ArrowLeft, BookOpen, MessageCircle, Copy } from 'lucide-react';

interface BlogPageProps {
  currentTheme: ThemeId;
}

export const BlogPage: React.FC<BlogPageProps> = ({ currentTheme }) => {
  const theme = THEMES[currentTheme] || THEMES['artisticFlair'] || THEMES['deepPurple'];
  const navigate = useNavigate();
  const { slug } = useParams<{ slug?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        if (slug) {
          // If a slug is provided, fetch that specific post (prefer exact match)
          const post = await fetchBlogPostBySlug(slug);
          if (!mounted) return;
          if (post) {
            setSelectedPost(post);
          } else {
            // fallback: also fetch list in case of eventual consistency
            const data = await fetchBlogPosts();
            if (!mounted) return;
            setPosts(data);
            setSelectedPost(data.find((p) => p.slug === slug) ?? null);
          }
        } else {
          const data = await fetchBlogPosts();
          if (!mounted) return;
          setPosts(data);
          setSelectedPost(null);
        }
      } catch (e) {
        console.warn('Error fetching blog data', e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [slug]);

  const isArticleView = Boolean(slug);

  const categories = ['All', 'Web Design', 'Performance', 'SEO & Growth', '3D & WebGL'];

  // Filter posts dynamically
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyLink = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleOpenArticle = (post: BlogPost) => {
    soundFx.playClick();
    window.open(`/blog/${post.slug}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 min-h-screen">
      <SEOHead
        title="Web Insights & Engineering Blog • Ayan Web Studio"
        description="Read technical insights on Core Web Vitals speed optimization, custom React web design, 3D WebGL experiences, and SEO strategy by founder Ayan."
      />

      {isArticleView && !selectedPost && !loading && (
        <div className="text-center space-y-6 py-20">
          <h1 className="text-4xl font-extrabold text-white">Article Not Found</h1>
          <p className="text-slate-300 text-base max-w-md mx-auto">
            The blog article you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>
        </div>
      )}

      {isArticleView && loading && (
        <div className="text-center py-20">
          <div className="text-slate-300">Loading article...</div>
        </div>
      )}

      {!isArticleView && (
        <>
          {/* Header Banner */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl">
          <BookOpen className="w-4 h-4 text-cyan-300" />
          <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase font-semibold">
            Studio Knowledge Hub
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Web Engineering & <br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
            Growth Insights
          </span>
        </h1>

        <p className="text-slate-300 font-light text-base sm:text-lg">
          In-depth architectural guides and conversion optimization techniques authored by founder Ayan. CMS-ready for future Supabase sync.
        </p>
      </div>

      {!isArticleView && (
        <>
          {/* Search & Category Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
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

            {/* Search Bar Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles & tags..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group rounded-3xl bg-white/[0.03] border border-white/10 hover:border-amber-400/50 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4 p-6">
                  {/* Featured Image */}
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-900">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-amber-300 font-bold">
                      {post.category}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-300" /> {post.publishedDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-300" /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-300 font-light line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {post.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Read Article Action */}
                <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-[11px] font-mono text-slate-300">{post.author.name}</span>
                  </div>

                  <button
                    onClick={() => handleOpenArticle(post)}
                    className="text-xs font-mono font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {isArticleView && selectedPost && (
        <div className="max-w-4xl mx-auto rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-10 space-y-8 shadow-2xl">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-sm font-mono text-cyan-300 hover:text-cyan-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all articles</span>
          </button>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-black text-xs font-mono font-extrabold uppercase">
                {selectedPost.category}
              </span>
              <span className="text-xs font-mono text-slate-400">{selectedPost.publishedDate}</span>
              <span className="text-xs font-mono text-slate-400">• {selectedPost.readTime}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {selectedPost.title}
            </h2>

            <div className="flex items-center gap-3 pt-2">
              <img src={selectedPost.author.avatar} alt={selectedPost.author.name} className="w-10 h-10 rounded-full object-cover border border-amber-400" />
              <div>
                <h4 className="text-sm font-bold text-white">{selectedPost.author.name}</h4>
                <p className="text-xs font-mono text-cyan-300">{selectedPost.author.role}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden h-72 sm:h-96 bg-slate-900 border border-white/10">
            <img src={selectedPost.coverImage} alt={selectedPost.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6 text-slate-200 font-light text-sm sm:text-base leading-relaxed border-t border-white/10 pt-6">
            {selectedPost.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Share Article:</span>
              <button onClick={handleCopyLink} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1">
                <Copy className="w-3.5 h-3.5 text-amber-300" />
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out this article from Ayan Web Studio: ${selectedPost.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-1 border border-emerald-500/30"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Share via WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => navigate('/blog')}
              className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs font-mono"
            >
              Back to Blog
            </button>
          </div>
        </div>
      )}

        </>
      )}

    </div>
  );
};
