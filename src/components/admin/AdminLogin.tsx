import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmail } from '../../lib/auth';
import { supabase } from '../../lib/supabaseClient';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      if (!supabase) throw new Error('Supabase not configured');
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage(error.message);
      } else {
        // Redirect to admin dashboard
        navigate('/admin');
      }
    } catch (err: any) {
      setMessage(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (!supabase) return setMessage('Supabase not configured');
    if (!email) return setMessage('Enter your email and click Forgot Password');
    try {
      await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/admin/login' });
      setMessage('Password reset email sent.');
    } catch (e: any) {
      setMessage(e?.message || 'Could not send reset');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-black/80 border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Admin Sign In</h2>
        <p className="text-xs text-slate-400 mb-4">Sign in with your admin account to access the CMS.</p>

        {message && <div className="p-3 mb-3 rounded bg-white/5 text-xs text-amber-300">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-slate-300 block mb-1">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-white" />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-white" />
          </div>

          <div className="flex items-center justify-between">
            <button disabled={loading} type="submit" className="px-4 py-2 rounded bg-amber-400 text-black font-bold">Sign In</button>
            <button type="button" onClick={handleForgot} className="text-xs text-slate-300 underline">Forgot Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};
