import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) {
        if (mounted) setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();
        if (!error && data && mounted) {
          setIsAdmin(Boolean(data.is_admin));
        }
      } catch (e) {
        console.warn('ProtectedRoute check failed', e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-12">Checking authentication...</div>;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};
