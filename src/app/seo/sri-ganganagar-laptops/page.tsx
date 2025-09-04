import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Laptop Shop in Sri Ganganagar | Buy Used & Refurbished Laptops | Shree Laptop Solutions',
  description: 'Best laptop shop in Sri Ganganagar, Rajasthan. Quality used & refurbished laptops, gaming laptops, and accessories at affordable prices. Free delivery from Hanumangarh to Sri Ganganagar.',
  keywords: 'laptop shop in Sri Ganganagar, buy laptop Sri Ganganagar, used laptop Sri Ganganagar, refurbished laptop Sri Ganganagar, gaming laptop Sri Ganganagar, laptop accessories Sri Ganganagar',
  openGraph: {
    title: 'Laptop Shop in Sri Ganganagar | Shree Laptop Solutions',
    description: 'Best laptop shop in Sri Ganganagar, Rajasthan. Quality used & refurbished laptops at affordable prices.',
    url: 'https://shreelaptop.shop/sri-ganganagar-laptops',
    siteName: 'Shree Laptop Solutions',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://shreelaptop.shop/sri-ganganagar-laptops',
  },
};

export default function SriGanganagarLaptopsPage() {
  return (
    <>
      
      <div className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            Best Laptop Shop in <span className="text-primary-600">Sri Ganganagar</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
            Get quality used and refurbished laptops delivered to Sri Ganganagar from our Hanumangarh shop. 
            We offer gaming laptops, budget laptops, and accessories with free delivery across Sri Ganganagar district.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">✓ Free Delivery to Sri Ganganagar</span>
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">✓ Quality Warranty</span>
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">✓ Expert Support</span>
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">✓ Best Prices</span>
          </div>
        </div>

        {/* Why Choose Us for Sri Ganganagar */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Why Sri Ganganagar Customers Choose Shree Laptop Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Free Delivery to Sri Ganganagar</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We deliver laptops directly to your doorstep in Sri Ganganagar with no extra charges.
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

        {/* Popular Laptop Categories for Sri Ganganagar */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Popular Laptop Categories in Sri Ganganagar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Gaming Laptops</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">High-performance gaming laptops for students and professionals in Sri Ganganagar</p>
              <Link href="/products?type=laptop&category=gaming" className="text-primary-600 hover:text-primary-700 font-medium">
                View Gaming Laptops →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20 p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Student Laptops</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Affordable laptops perfect for students in Sri Ganganagar colleges and schools</p>
              <Link href="/products?type=laptop&category=student" className="text-accent-600 hover:text-accent-700 font-medium">
                View Student Laptops →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-tertiary-50 to-tertiary-100 dark:from-tertiary-900/20 dark:to-tertiary-800/20 p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Business Laptops</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Professional laptops for office work and business in Sri Ganganagar</p>
              <Link href="/products?type=laptop&category=business" className="text-tertiary-600 hover:text-tertiary-700 font-medium">
                View Business Laptops →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-700/20 p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Laptop Accessories</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Mice, keyboards, bags, and other laptop accessories delivered to Sri Ganganagar</p>
              <Link href="/products?type=accessory" className="text-gray-600 hover:text-gray-700 font-medium">
                View Accessories →
              </Link>
            </div>
          </div>
        </div>

        {/* Service Areas in Sri Ganganagar */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            We Deliver Across Sri Ganganagar District
          </h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white">Sri Ganganagar City</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Free Delivery</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white">Padampur</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Free Delivery</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white">Karanpur</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Free Delivery</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white">Raisinghnagar</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Free Delivery</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white">Anupgarh</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Free Delivery</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white">Vijaynagar</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Free Delivery</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white">Gharsana</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Free Delivery</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white">Sadulshahar</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Free Delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Buy Your Laptop in Sri Ganganagar?</h2>
          <p className="text-xl mb-8 opacity-90">
            Call us now for free consultation and get your laptop delivered to Sri Ganganagar
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
