'use client';

import { getAllProducts } from '@/lib/services/productService';
import { Product } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    laptops: 0,
    accessories: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const products = await getAllProducts();
        setProducts(products);
        
        // Calculate stats
        const laptops = products.filter(p => p.type === 'laptop').length;
        const accessories = products.filter(p => p.type === 'accessory').length;
        setStats({ laptops, accessories });
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold font-montserrat">
          Welcome, <span className="text-primary-600 dark:text-primary-400">{user?.email?.split('@')[0] || 'Admin'}</span>
        </h1>
        
        <Link 
          href="/admin/products/new" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors self-start sm:self-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Product
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 card-hover">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-raleway">Total Products</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{isLoading ? '-' : products.length}</p>
            </div>
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
          </div>
          {!isLoading && <div className="mt-2 text-xs text-primary-600 dark:text-primary-400">
            {products.length > 0 ? `${products.length} products in inventory` : 'No products yet'}
          </div>}
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 card-hover">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-raleway">Laptops</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{isLoading ? '-' : stats.laptops}</p>
            </div>
            <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg text-accent-600 dark:text-accent-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          {!isLoading && <div className="mt-2 text-xs text-accent-600 dark:text-accent-400">
            {stats.laptops > 0 ? `${Math.round((stats.laptops / products.length) * 100)}% of inventory` : 'No laptops yet'}
          </div>}
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 card-hover">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-raleway">Accessories</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{isLoading ? '-' : stats.accessories}</p>
            </div>
            <div className="p-2 bg-tertiary-100 dark:bg-tertiary-900/30 rounded-lg text-tertiary-600 dark:text-tertiary-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
          {!isLoading && <div className="mt-2 text-xs text-tertiary-600 dark:text-tertiary-400">
            {stats.accessories > 0 ? `${Math.round((stats.accessories / products.length) * 100)}% of inventory` : 'No accessories yet'}
          </div>}
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 card-hover">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-raleway">Last Update</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
      
      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 card-hover">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white font-montserrat">Product Management</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4 font-raleway">
            Manage your product inventory, add new products, edit existing ones, or remove products.
          </p>
          <Link 
            href="/admin/products" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Manage Products
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 card-hover">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg text-accent-600 dark:text-accent-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white font-montserrat">View Website</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4 font-raleway">
            Check how your products look on the main website and see the customer experience.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Go to Website
          </Link>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 card-hover">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-tertiary-100 dark:bg-tertiary-900/30 rounded-lg text-tertiary-600 dark:text-tertiary-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white font-montserrat">Recent Updates</h2>
        </div>
        
        <div className="space-y-4 mt-4">
          <div className="p-4 rounded-lg border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20">
            <p className="text-gray-800 dark:text-gray-200 font-raleway">
              Welcome to your new admin dashboard! From here, you can manage all your products.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Just now
            </p>
          </div>
          
          <div className="p-4 rounded-lg border-l-4 border-accent-500 bg-accent-50 dark:bg-accent-900/20">
            <p className="text-gray-800 dark:text-gray-200 font-raleway">
              The website has been updated with improved mobile responsiveness and dark mode as default.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Today
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 