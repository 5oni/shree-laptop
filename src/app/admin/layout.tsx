'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminProtected from '@/components/AdminProtected';
import { useAuth } from '@/lib/context/AuthContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { user, signOut } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <AdminProtected>
      <div className="min-h-screen">
        <div className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white font-montserrat">Admin Dashboard</h1>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
              
              {/* Desktop navigation */}
              <nav className="hidden md:flex gap-4 items-center">
                <Link 
                  href="/admin" 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/admin/products" 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Products
                </Link>
                <Link 
                  href="/" 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Back to Site
                </Link>
                <div className="border-l border-gray-300 dark:border-gray-600 h-6 mx-2"></div>
                <div className="text-sm text-gray-600 dark:text-gray-300 hidden lg:block">
                  {user?.email}
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              </nav>
            </div>
            
            {/* Mobile navigation */}
            {isMobileMenuOpen && (
              <div className="md:hidden py-3 animate-fade-in">
                <nav className="flex flex-col space-y-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <Link 
                    href="/admin" 
                    className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/admin/products" 
                    className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <Link 
                    href="/" 
                    className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Back to Site
                  </Link>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">
                    {user?.email}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-2 text-left rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                  >
                    Sign Out
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </div>
    </AdminProtected>
  );
} 