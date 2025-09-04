import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Laptop Shop in Pilibanga | Buy Used & Refurbished Laptops | Shree Laptop Solutions',
  description: 'Best laptop shop in Pilibanga, Hanumangarh district. Quality used & refurbished laptops, gaming laptops, and accessories at affordable prices. Free delivery in Pilibanga and nearby areas.',
  keywords: 'laptop shop in Pilibanga, buy laptop Pilibanga, used laptop Pilibanga, refurbished laptop Pilibanga, gaming laptop Pilibanga, laptop accessories Pilibanga, Pilibanga laptop dealer',
  openGraph: {
    title: 'Laptop Shop in Pilibanga | Shree Laptop Solutions',
    description: 'Best laptop shop in Pilibanga, Hanumangarh district. Quality used & refurbished laptops at affordable prices.',
    url: 'https://shreelaptop.shop/seo/pilibanga-laptops',
    siteName: 'Shree Laptop Solutions',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://shreelaptop.shop/seo/pilibanga-laptops',
  },
};

export default function PilibangaLaptopsPage() {
  return (
    <>
      
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            Best Laptop Shop in <span className="text-primary-600">Pilibanga</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
            Get quality used and refurbished laptops delivered to Pilibanga from our Hanumangarh shop. 
            We offer gaming laptops, budget laptops, and accessories with free delivery across Pilibanga tehsil.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">✓ Free Delivery to Pilibanga</span>
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">✓ Quality Warranty</span>
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">✓ Expert Support</span>
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">✓ Best Prices</span>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Why Pilibanga Customers Choose Shree Laptop Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Free Delivery to Pilibanga</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We deliver laptops directly to your doorstep in Pilibanga with no extra charges.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Quality Tested Laptops</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every laptop is thoroughly tested and comes with warranty. Your satisfaction is guaranteed.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-tertiary-100 dark:bg-tertiary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-tertiary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Competitive Pricing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Best prices in the region with no hidden charges. Get quality laptops at affordable rates.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Buy Your Laptop in Pilibanga?</h2>
          <p className="text-xl mb-8 opacity-90">
            Call us now for free consultation and get your laptop delivered to Pilibanga
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+917878224705" className="px-8 py-3 bg-white text-primary-700 hover:bg-gray-100 rounded-xl font-medium transition-all hover:scale-105">
              Call Now: +91 78782 24705
            </a>
            <Link href="/products" className="px-8 py-3 border-2 border-white hover:bg-white/10 text-white rounded-xl font-medium transition-all hover:scale-105">
              Browse Laptops
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
