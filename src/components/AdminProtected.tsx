'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';

interface AdminProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: AdminProtectedProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Show nothing while loading or redirecting
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  // If we reach here, the user is authenticated
  return <>{children}</>;
} 