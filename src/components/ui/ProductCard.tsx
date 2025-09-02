'use client';

import { useState } from 'react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleWhatsAppClick = () => {
    const whatsappNumber = '917878224705'; // This should come from your contact info
    const text = `Hi, I am interested in the ${product.name}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Check if we have a valid image URL
  const hasValidImage = product.image && product.image.trim() !== '';
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col card-hover group animate-fade-in h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-36 sm:h-44 w-full overflow-hidden">
        {/* Shimmer effect while image loads */}
        {hasValidImage && !isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 shimmer"></div>
        )}
        
        {hasValidImage ? (
          <img
            src={product.image}
            alt={product.name}
            className={`object-cover w-full h-full transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'} ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
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
        ) : (
          // Show No Image placeholder
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <div className="text-gray-500 dark:text-gray-400 font-medium text-lg">No Image</div>
          </div>
        )}
        
        {/* Product type badge */}
        <div className="absolute top-2 right-2 transform group-hover:scale-110 transition-transform duration-300">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            product.type === 'laptop' 
              ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300' 
              : 'bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300'
          }`}>
            {product.type === 'laptop' ? 'Laptop' : 'Accessory'}
          </span>
        </div>
        
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
          <div className="text-lg font-bold text-primary-600 dark:text-primary-400 font-montserrat group-hover:scale-105 transform transition-transform">
            {product.price}
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
        onClick={handleWhatsAppClick}
        className="w-full py-2.5 sm:py-3 bg-green-500 hover:bg-green-600 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-green-600 btn-hover text-sm sm:text-base"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse-slow">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v6h-2zm0 8h2v2h-2z" />
        </svg>
        Contact on WhatsApp
      </button>
    </div>
  );
} 