import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gaming Laptop in Hanumangarh Rajasthan | Best Gaming Laptops | Shree Laptop Solutions',
  description: 'Best gaming laptop in Hanumangarh, Rajasthan. High-performance gaming laptops, used gaming laptops, and gaming accessories at affordable prices. Free delivery in Hanumangarh and nearby areas.',
  keywords: 'gaming laptop in Hanumangarh, gaming laptop Hanumangarh Rajasthan, buy gaming laptop Hanumangarh, used gaming laptop Hanumangarh, gaming laptop accessories Hanumangarh',
  openGraph: {
    title: 'Gaming Laptop in Hanumangarh Rajasthan | Shree Laptop Solutions',
    description: 'Best gaming laptop in Hanumangarh, Rajasthan. High-performance gaming laptops at affordable prices.',
    url: 'https://shreelaptop.shop/gaming-laptops-hanumangarh',
    siteName: 'Shree Laptop Solutions',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://shreelaptop.shop/gaming-laptops-hanumangarh',
  },
};

export default function GamingLaptopsHanumangarhPage() {
  return (
    <>
      
      <div className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            Best <span className="text-primary-600">Gaming Laptop</span> in Hanumangarh, Rajasthan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
            Get high-performance gaming laptops in Hanumangarh at unbeatable prices. 
            We offer used and refurbished gaming laptops with powerful graphics cards, fast processors, and premium gaming features.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">✓ High-Performance Gaming</span>
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">✓ Latest Graphics Cards</span>
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">✓ Free Delivery in Hanumangarh</span>
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">✓ Gaming Accessories</span>
          </div>
        </div>

        {/* Gaming Laptop Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Why Choose Our Gaming Laptops in Hanumangarh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Powerful Graphics Cards</h3>
              <p className="text-gray-600 dark:text-gray-300">
                NVIDIA GTX/RTX series and AMD Radeon graphics cards for smooth gaming performance in Hanumangarh.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">High-Speed Processors</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Intel Core i5/i7/i9 and AMD Ryzen processors for lag-free gaming experience in Hanumangarh.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-tertiary-100 dark:bg-tertiary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-tertiary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Gaming Accessories</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Gaming mice, keyboards, headsets, and cooling pads available in Hanumangarh.
              </p>
            </div>
          </div>
        </div>

        {/* Gaming Laptop Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Gaming Laptop Categories in Hanumangarh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Entry-Level Gaming</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Budget-friendly gaming laptops for casual gamers in Hanumangarh</p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>• GTX 1650/1660 Graphics</li>
                <li>• Intel i5/AMD Ryzen 5</li>
                <li>• 8GB RAM</li>
                <li>• 512GB SSD</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20 p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Mid-Range Gaming</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Perfect balance of performance and price for gamers in Hanumangarh</p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>• RTX 3060/3070 Graphics</li>
                <li>• Intel i7/AMD Ryzen 7</li>
                <li>• 16GB RAM</li>
                <li>• 1TB SSD</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-tertiary-50 to-tertiary-100 dark:from-tertiary-900/20 dark:to-tertiary-800/20 p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">High-End Gaming</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Premium gaming laptops for serious gamers in Hanumangarh</p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>• RTX 3080/4080 Graphics</li>
                <li>• Intel i9/AMD Ryzen 9</li>
                <li>• 32GB RAM</li>
                <li>• 2TB SSD</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-700/20 p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Gaming Accessories</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Complete your gaming setup with accessories in Hanumangarh</p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Gaming Mice</li>
                <li>• Mechanical Keyboards</li>
                <li>• Gaming Headsets</li>
                <li>• Cooling Pads</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Popular Games Support */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Popular Games You Can Play
          </h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Valorant</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">60+ FPS</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">PUBG Mobile</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">60+ FPS</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">GTA V</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">45+ FPS</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Fortnite</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">60+ FPS</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">CS:GO</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">100+ FPS</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Apex Legends</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">60+ FPS</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Call of Duty</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">60+ FPS</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Minecraft</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">120+ FPS</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Buy Your Gaming Laptop in Hanumangarh?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get the best gaming laptop in Hanumangarh with free delivery and warranty
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+917878224705" className="px-8 py-3 bg-white text-primary-700 hover:bg-gray-100 rounded-xl font-medium transition-all hover:scale-105">
              Call Now: +91 78782 24705
            </a>
            <Link 
              href="/products?type=laptop&category=gaming" 
              className="px-8 py-3 border-2 border-white hover:bg-white/10 text-white rounded-xl font-medium transition-all hover:scale-105"
            >
              View Gaming Laptops
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
