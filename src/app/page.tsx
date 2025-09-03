'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/ui/SearchBar';
import ProductTypeFilter from '@/components/ui/ProductTypeFilter';
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/types';
import * as productService from '@/lib/services/productService';

export default function Home() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle URL parameters for filtering
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam && (typeParam === 'laptop' || typeParam === 'accessory')) {
      setActiveType(typeParam);
    }
  }, [searchParams]);

  // Fetch products from Firestore
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const fetchedProducts = await productService.getAllProducts();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Filter products based on search query and type
  useEffect(() => {
    if (!products.length) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specs.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.price.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = activeType === 'all' || product.type === activeType;

      return matchesSearch && matchesType;
    });

    // Sort products: featured first, then by creation date
    const sorted = filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
    });

    setFilteredProducts(sorted);
  }, [searchQuery, activeType, products]);

  // Get featured products
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] sm:h-[650px] md:h-[700px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-laptop-pattern bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        
        {/* Animated tech elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-16 h-16 bg-primary-500/10 rounded-full animate-float"></div>
          <div className="absolute top-[30%] right-[10%] w-24 h-24 bg-accent-500/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-[20%] left-[15%] w-20 h-20 bg-tertiary-500/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4 container mx-auto">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-4 font-montserrat">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Shree Laptop</span> Solutions
            </h1>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-lg md:text-xl text-center max-w-3xl mb-6 font-raleway">
              Find quality used and refurbished laptops at affordable prices. All our products are thoroughly tested and come with warranty.
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 mt-8 transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a 
              href="#products" 
              className="px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all hover:scale-105 btn-hover"
            >
              Browse Products
            </a>
            <a 
              href="/contact" 
              className="px-8 py-3.5 border-2 border-white/30 hover:border-white/60 text-white rounded-xl font-medium transition-all hover:scale-105"
            >
              Contact Us
            </a>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-montserrat text-gray-800 dark:text-white inline-block relative">
                ⭐ Featured Products
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-primary-500 rounded-full"></span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-raleway">
                Check out our handpicked selection of the best deals and quality products.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="transition-all duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section id="products" className="pt-8 scroll-mt-24 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-montserrat text-gray-800 dark:text-white inline-block relative">
            Our Collection
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-primary-500 rounded-full"></span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-raleway">
            Browse our collection of quality used and refurbished laptops and accessories.
          </p>
        </div>

        <div className="space-y-8">
          <SearchBar onSearch={setSearchQuery} />
          <ProductTypeFilter activeType={activeType} onTypeChange={setActiveType} />

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="flex flex-col items-center">
                <div className="animate-spin h-12 w-12 border-4 border-primary-600 border-t-transparent rounded-full mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">Loading products...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-500 text-xl mb-2">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="transition-all duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">No products found</p>
                    <p className="text-gray-500 dark:text-gray-400">Try a different search or filter</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-montserrat text-gray-800 dark:text-white inline-block relative">
              Why Choose Us
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-20 bg-primary-500 rounded-full"></span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center card-hover">
              <div className="flex justify-center mb-6 text-primary-600 dark:text-primary-400">
                <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 font-montserrat text-gray-800 dark:text-white">Quality Assured</h3>
              <p className="text-gray-600 dark:text-gray-300 font-raleway">All our products are thoroughly tested and come with warranty for your peace of mind.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center card-hover">
              <div className="flex justify-center mb-6 text-accent-600 dark:text-accent-400">
                <div className="p-4 bg-accent-100 dark:bg-accent-900/30 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 font-montserrat text-gray-800 dark:text-white">Affordable Prices</h3>
              <p className="text-gray-600 dark:text-gray-300 font-raleway">Get quality laptops at a fraction of the original cost without compromising on performance.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center card-hover">
              <div className="flex justify-center mb-6 text-tertiary-600 dark:text-tertiary-400">
                <div className="p-4 bg-tertiary-100 dark:bg-tertiary-900/30 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.5 9.5v5m5-5v5" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 font-montserrat text-gray-800 dark:text-white">Expert Support</h3>
              <p className="text-gray-600 dark:text-gray-300 font-raleway">Get technical assistance and advice from our experts whenever you need it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-montserrat">Ready to find your perfect laptop?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto font-raleway">
            Browse our collection or contact us directly for personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#products" 
              className="px-8 py-3.5 bg-white text-primary-700 hover:bg-gray-100 rounded-xl font-medium transition-all hover:scale-105"
            >
              View Products
            </a>
            <a 
              href="/contact" 
              className="px-8 py-3.5 border-2 border-white hover:bg-white/10 text-white rounded-xl font-medium transition-all hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 