import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { signOut } from '../../lib/auth';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-[#07070a] border-r border-white/6 p-4">
        <div className="mb-6">
          <h3 className="text-white font-bold">Ayan Studio Admin</h3>
          <p className="text-xs text-slate-400">CMS Control Panel</p>
        </div>

        <nav className="space-y-2 text-sm">
          <Link to="/admin" className="block text-slate-300 hover:text-white">Dashboard</Link>
          <Link to="/admin/blog" className="block text-slate-300 hover:text-white">Blog Manager</Link>
          <Link to="/admin/media" className="block text-slate-300 hover:text-white">Media Library</Link>
          <Link to="/admin/services" className="block text-slate-300 hover:text-white">Services</Link>
          <Link to="/admin/pricing" className="block text-slate-300 hover:text-white">Pricing</Link>
          <Link to="/admin/contact" className="block text-slate-300 hover:text-white">Contact Messages</Link>
        </nav>

        <div className="mt-8">
          <button onClick={handleSignOut} className="w-full py-2 rounded bg-white/5 text-xs text-amber-300">Sign Out</button>
        </div>
      </aside>

      <main className="flex-1 p-6 bg-gradient-to-b from-black/50 to-black/40">
        <Outlet />
      </main>
    </div>
  );
};
