'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { getProductById } from '@/lib/services/supabaseService';
import LaptopSpecsDisplay from '@/components/ui/LaptopSpecsDisplay';

interface ProductDetailClientProps {
  productId: string;
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(productId);
        
        if (!productData) {
          setError('Product not found');
          return;
        }
        
        setProduct(productData);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleWhatsAppClick = () => {
    if (!product) return;
    const whatsappNumber = '917878224705';
    const text = `Hi, I am interested in the ${product.name}. Can you provide more details?`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleCallClick = () => {
    const phoneNumber = '917878224705';
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin h-12 w-12 border-4 border-primary-600 border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Product Not Found</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error || 'The product you are looking for does not exist.'}</p>
              <Link 
                href="/"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get all available images
  const allImages = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
  const currentImage = allImages[currentImageIndex] || '';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">
              Home
            </Link>
            <span>/</span>
            <Link href="/#products" className="hover:text-primary-600 dark:hover:text-primary-400">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-800 dark:text-white">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="aspect-square flex items-center justify-center p-4">
                {currentImage ? (
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-gray-500 dark:text-gray-400 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>No Image Available</p>
                  </div>
                )}
              </div>
              
              {/* Left/Right Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePreviousImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-primary-500 ring-2 ring-primary-200'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain bg-gray-100 dark:bg-gray-700"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Marketing Badges */}
            <div className="flex flex-wrap gap-2">
              {/* Today Only Badge */}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse shadow-lg">
                🔥 TODAY ONLY
              </span>
              
              {/* Discount Badge */}
              {product.discount && product.discount > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-red-500 text-white animate-bounce">
                  -{product.discount}% OFF
                </span>
              )}
              
              {/* Featured Badge */}
              {product.featured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500 text-white">
                  ⭐ Featured
                </span>
              )}
              
              {/* Limited Stock Badge */}
              {product.availability === 'limited' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-orange-500 text-white animate-pulse">
                  ⚡ Limited Stock
                </span>
              )}
              
              {/* Product Type Badge */}
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                product.type === 'laptop'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
                {product.type === 'laptop' ? 'Laptop' : 'Accessory'}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white font-montserrat">
              {product.name}
            </h1>

            {/* Contact for Price - Marketing Strategy */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 font-montserrat mb-2">
                  💬 Contact for Best Price
                </div>
                {product.discount && product.discount > 0 && (
                  <div className="text-lg text-red-500 dark:text-red-400 font-semibold animate-pulse">
                    Save {product.discount}% Today!
                  </div>
                )}
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Get instant pricing and exclusive deals by contacting us now
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Specifications</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {product.specs}
                </p>
              </div>
            </div>

            {/* Detailed Laptop Specifications */}
            {product.type === 'laptop' && product.detailedSpecs && (
              <LaptopSpecsDisplay specs={product.detailedSpecs} />
            )}

            {/* Free Gifts (Laptops only) */}
            {product.type === 'laptop' && product.freeGifts && product.freeGifts.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">🎁 Free Gifts Included</h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.freeGifts.map((gift, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <div className="text-2xl">
                          {gift.category === 'bag' && '🎒'}
                          {gift.category === 'keyboard' && '⌨️'}
                          {gift.category === 'mouse' && '🖱️'}
                          {gift.category === 'keyguard' && '🛡️'}
                          {gift.category === 'mousepad' && '🖱️'}
                          {gift.category === 'stand' && '📐'}
                          {gift.category === 'cleaning' && '🧽'}
                          {gift.category === 'airpods' && '🎧'}
                          {gift.category === 'watch' && '⌚'}
                          {gift.category === 'other' && '🎁'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white">{gift.name}</h3>
                          {gift.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">{gift.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Laptop Condition Assessment (Laptops only) */}
            {product.type === 'laptop' && product.laptopCondition && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">🔍 Condition Assessment</h2>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Overall Condition</h3>
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                      product.laptopCondition.overall === 'excellent' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : product.laptopCondition.overall === 'good'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {product.laptopCondition.overall.charAt(0).toUpperCase() + product.laptopCondition.overall.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Physical Condition</h4>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <div>Scratches: {product.laptopCondition.details.scratches || 'N/A'}</div>
                        <div>Dents: {product.laptopCondition.details.dents || 'N/A'}</div>
                        <div>Color Fading: {product.laptopCondition.details.colorFading || 'N/A'}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Component Condition</h4>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <div>Screen: {product.laptopCondition.details.screenCondition || 'N/A'}</div>
                        <div>Keyboard: {product.laptopCondition.details.keyboardCondition || 'N/A'}</div>
                        <div>Battery: {product.laptopCondition.details.batteryHealth || 'N/A'}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Accessories</h4>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <div>Charger: {product.laptopCondition.details.chargerIncluded ? '✅ Included' : '❌ Not Included'}</div>
                        <div>Original Box: {product.laptopCondition.details.boxIncluded ? '✅ Included' : '❌ Not Included'}</div>
                        {product.laptopCondition.details.warrantyRemaining && (
                          <div>Warranty: {product.laptopCondition.details.warrantyRemaining}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Product Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Condition */}
              {product.condition && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                    <span className="text-blue-500">📦</span> Condition
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 capitalize font-medium">{product.condition}</p>
                </div>
              )}

              {/* Warranty */}
              {product.warranty && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                    <span className="text-green-500">🛡️</span> Warranty
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">{product.warranty}</p>
                </div>
              )}

              {/* Availability */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                  <span className="text-orange-500">📊</span> Availability
                </h3>
                <p className={`font-medium ${
                  product.availability === 'in_stock' 
                    ? 'text-green-600 dark:text-green-400' 
                    : product.availability === 'limited'
                    ? 'text-orange-600 dark:text-orange-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {product.availability === 'in_stock' ? '✅ In Stock' : 
                   product.availability === 'limited' ? '⚠️ Limited Stock' : 
                   '❌ Out of Stock'}
                </p>
              </div>

              {/* Category (for accessories) */}
              {product.category && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                    <span className="text-purple-500">🏷️</span> Category
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">{product.category}</p>
                </div>
              )}
            </div>

            {/* Price Information (Hidden but shown in marketing context) */}
            {product.originalPrice && product.discount && product.discount > 0 && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Original Price</div>
                  <div className="text-lg text-gray-500 dark:text-gray-400 line-through">{product.originalPrice}</div>
                  <div className="text-sm text-red-600 dark:text-red-400 font-semibold mt-1">
                    You Save {product.discount}% by contacting us!
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 animate-bounce">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.72.043.433-.101.593z"/>
                </svg>
                🚀 Get Best Price on WhatsApp
              </button>

              <button
                onClick={handleCallClick}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                📞 Call for Instant Quote
              </button>
            </div>

            {/* Urgency and Trust Signals */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">⚡ Limited Time Offer!</h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
                    Contact us now for exclusive pricing, warranty details, and free consultation. Don&apos;t miss out on this amazing deal!
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full">✅ Free Consultation</span>
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">🛡️ Warranty Included</span>
                    <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded-full">🚚 Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">More Products</h2>
            <p className="text-gray-600 dark:text-gray-400">Explore our other quality products</p>
          </div>
          <div className="text-center">
            <Link 
              href="/#products"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
