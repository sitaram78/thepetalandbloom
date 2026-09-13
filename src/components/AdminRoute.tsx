import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Loader2 } from 'lucide-react';

export default function AdminRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-parchment-50 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-rose" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
