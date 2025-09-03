'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null);

  const handleWhatsAppClick = () => {
    const whatsappNumber = '917878224705'; // This should come from your contact info
    const text = `Hi, I am interested in the ${product.name}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Get all available images (use images array if available, otherwise fallback to single image)
  const allImages = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
  const hasValidImage = allImages.length > 0;
  const currentImage = allImages[currentImageIndex] || '';

  // Auto-scroll images
  useEffect(() => {
    if (allImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
      }, 3000); // Change image every 3 seconds
      setAutoScrollInterval(interval);
      
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [allImages.length]);

  // Stop auto-scroll on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      setAutoScrollInterval(null);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (allImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
      }, 3000);
      setAutoScrollInterval(interval);
    }
  };

  const handlePreviousImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };
  
  return (
    <Link 
      href={`/products/${product.id}`}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col card-hover group animate-fade-in h-full block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-36 sm:h-44 w-full overflow-hidden">
        {/* Shimmer effect while image loads */}
        {hasValidImage && !isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 shimmer"></div>
        )}
        
        {hasValidImage ? (
          <>
            <img
              src={currentImage}
              alt={product.name}
              className={`object-contain w-full h-full transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'} ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsImageLoaded(true)}
              onError={(e) => {
                // If image fails to load, replace with No Image placeholder
                const imgElement = e.currentTarget;
                imgElement.onerror = null;
                imgElement.style.display = 'none';
                
                const parentElement = imgElement.parentElement;
                if (parentElement) {
                  parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-gray-200', 'dark:bg-gray-700');
                  const placeholder = document.createElement('div');
                  placeholder.innerText = 'No Image';
                  placeholder.className = 'text-gray-500 dark:text-gray-400 font-medium text-lg';
                  parentElement.appendChild(placeholder);
                }
              }}
            />
            
            {/* Left/Right Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Navigation Dots */}
            {allImages.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-white shadow-md' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
            
            {/* Image Counter */}
            {allImages.length > 1 && (
              <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                {currentImageIndex + 1}/{allImages.length}
              </div>
            )}
          </>
        ) : (
          // Show No Image placeholder
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <div className="text-gray-500 dark:text-gray-400 font-medium text-lg">No Image</div>
          </div>
        )}
        
        {/* Product badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {/* Today Only Badge - Marketing Trick */}
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse shadow-lg">
            🔥 TODAY ONLY
          </span>
          
          {/* Discount badge */}
          {product.discount && product.discount > 0 && (
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-500 text-white animate-bounce">
              -{product.discount}% OFF
            </span>
          )}
          
          {/* Featured badge */}
          {product.featured && (
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-500 text-white">
              ⭐ Featured
            </span>
          )}
          
          {/* Limited Stock Badge - Urgency */}
          {product.availability === 'limited' && (
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-orange-500 text-white animate-pulse">
              ⚡ Limited Stock
            </span>
          )}
          
          {/* Product type badge */}
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            product.type === 'laptop' 
              ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300' 
              : 'bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300'
          }`}>
            {product.type === 'laptop' ? 'Laptop' : 'Accessory'}
          </span>
        </div>
        
        {/* Availability badge */}
        {product.availability && product.availability !== 'in_stock' && (
          <div className="absolute top-2 left-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              product.availability === 'out_of_stock' 
                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
            }`}>
              {product.availability === 'out_of_stock' ? 'Out of Stock' : 'Limited Stock'}
            </span>
          </div>
        )}
        
        {/* Overlay gradient on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      </div>
      
      <div className="p-3 sm:p-4 flex-grow flex flex-col">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-1 sm:mb-2 font-montserrat line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
          {product.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-3 text-xs sm:text-sm flex-grow font-raleway line-clamp-3">
          {product.specs}
        </p>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            {/* Contact for Price - Marketing Strategy */}
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold text-green-600 dark:text-green-400 font-montserrat group-hover:scale-105 transform transition-transform">
                💬 Contact for Price
              </div>
              {product.discount && product.discount > 0 && (
                <div className="text-xs text-red-500 dark:text-red-400 font-semibold animate-pulse">
                  Save {product.discount}%
                </div>
              )}
            </div>
            
            {/* Condition and warranty info */}
            <div className="flex items-center gap-2 mt-1">
              {product.condition && (
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {product.condition}
                </span>
              )}
              {product.warranty && (
                <span className="text-xs text-green-600 dark:text-green-400">
                  {product.warranty}
                </span>
              )}
            </div>
          </div>
          
          {/* Tech specs icon */}
          <div className="text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleWhatsAppClick();
        }}
        className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 btn-hover text-sm sm:text-base shadow-lg hover:shadow-xl"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v6h-2zm0 8h2v2h-2z" />
        </svg>
        🚀 Get Best Price Now!
      </button>
    </Link>
  );
} 