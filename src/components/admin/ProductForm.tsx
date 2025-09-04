'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product, LaptopSpecs } from '@/types';
import { uploadProductImage } from '@/lib/services/supabaseService';
import LaptopSpecsForm from './LaptopSpecsForm';
import FreeGiftForm from './FreeGiftForm';
import LaptopConditionForm from './LaptopConditionForm';
import imageCompression from 'browser-image-compression';

interface ProductFormProps {
  product?: Product;
  onSubmit: (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  isLoading: boolean;
}

export default function ProductForm({ product, onSubmit, isLoading }: ProductFormProps) {
  const router = useRouter();
  const [name, setName] = useState(product?.name || '');
  const [specs, setSpecs] = useState(product?.specs || '');
  const [price, setPrice] = useState(product?.price || '');
  const [originalPrice, setOriginalPrice] = useState(product?.originalPrice || '');
  const [discount, setDiscount] = useState(product?.discount || 0);
  const [type, setType] = useState<'laptop' | 'accessory'>(product?.type || 'laptop');
  const [category, setCategory] = useState(product?.category || '');
  const [condition, setCondition] = useState<'new' | 'used' | 'refurbished'>(product?.condition || 'used');
  const [warranty, setWarranty] = useState(product?.warranty || '');
  const [availability, setAvailability] = useState<'in_stock' | 'out_of_stock' | 'limited'>(product?.availability || 'in_stock');
  const [featured, setFeatured] = useState(product?.featured || false);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null);
  const [imagePreviews, setImagePreviews] = useState<string[]>(product?.images || []);
  const [detailedSpecs, setDetailedSpecs] = useState<LaptopSpecs>(product?.detailedSpecs || {});
  const [freeGifts, setFreeGifts] = useState(product?.freeGifts || []);
  const [laptopCondition, setLaptopCondition] = useState(product?.laptopCondition || {
    overall: 'excellent' as const,
    details: {
      scratches: 'none' as const,
      dents: 'none' as const,
      colorFading: 'none' as const,
      screenCondition: 'perfect' as const,
      keyboardCondition: 'perfect' as const,
      batteryHealth: 'excellent' as const,
      chargerIncluded: true,
      boxIncluded: true,
      warrantyRemaining: '',
    },
  });
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Clear category when type is laptop (for existing products)
  useEffect(() => {
    if (type === 'laptop') {
      setCategory('');
    }
  }, [type]);

  const compressImage = async (file: File): Promise<File> => {
    try {
      const options = {
        maxSizeMB: 2, // Compress to max 2MB
        maxWidthOrHeight: 1920, // Max width or height
        useWebWorker: true,
        quality: 0.8, // 80% quality
      };
      
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error('Error compressing image:', error);
      return file; // Return original if compression fails
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    // Validate all files
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload only valid image files');
        return;
      }
      
      if (file.size > 50 * 1024 * 1024) { // Increased to 50MB
        setError('Each image should be less than 50MB');
        return;
      }
    }
    
    // Limit to 10 images maximum
    if (imagePreviews.length + files.length > 10) {
      setError('Maximum 10 images allowed');
      return;
    }
    
    setError('');
    setIsUploading(true);
    
    try {
      // Compress all images
      const compressedFiles = await Promise.all(files.map(compressImage));
      
      // Create preview URLs for compressed files
      const newPreviewUrls = compressedFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviewUrls]);
      setSelectedFiles(prev => [...prev, ...compressedFiles]);
      
      // Set first image as primary if no primary image exists
      if (!imagePreview) {
        setImagePreview(newPreviewUrls[0]);
      }
    } catch (error) {
      console.error('Error processing images:', error);
      setError('Error processing images. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview && !imagePreview.startsWith('http')) {
        URL.revokeObjectURL(imagePreview);
      }
      imagePreviews.forEach(url => {
        if (!url.startsWith('http')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [imagePreview, imagePreviews]);

  const uploadImage = async (file: File): Promise<string> => {
    try {
      // Use Supabase Storage directly
      return await uploadProductImage(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
    setIsUploading(true);
    try {
      const uploadPromises = files.map(file => uploadImage(file));
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !specs || !price || !type) {
      setError('Please fill all required fields');
      return;
    }

    try {
      let allImages = [...imagePreviews];
      
      // If there are new files selected, upload them first
      if (selectedFiles.length > 0) {
        try {
          const uploadedUrls = await uploadMultipleImages(selectedFiles);
          allImages = [...allImages, ...uploadedUrls];
        } catch (error) {
          console.error('Upload error:', error);
          setError('Failed to upload images. Please try again.');
          return;
        }
      }
      
      // Set primary image (first image or existing primary)
      const primaryImage = imagePreview || allImages[0] || '';
      
      // Create a product data object that matches the required type
          const productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
      name,
      specs,
      detailedSpecs: type === 'laptop' ? detailedSpecs : undefined,
      price,
      originalPrice: originalPrice || undefined,
      discount: discount > 0 ? discount : undefined,
      type,
      category: category || undefined,
      condition: condition || undefined,
      laptopCondition: type === 'laptop' ? laptopCondition : undefined,
      freeGifts: type === 'laptop' ? freeGifts : undefined,
      warranty: warranty || undefined,
      availability: availability || 'in_stock',
      featured: featured || false,
      image: primaryImage,
      images: allImages,
    };

      // Pass the data to the parent component for submission
      await onSubmit(productData);
    } catch (err) {
      setError('Failed to save product. Please try again.');
      console.error(err);
    }
  };

  const removeImage = (index: number) => {
    const imageToRemove = imagePreviews[index];
    if (imageToRemove && !imageToRemove.startsWith('http')) {
      URL.revokeObjectURL(imageToRemove);
    }
    
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    
    // If we removed the primary image, set a new primary
    if (imagePreview === imageToRemove) {
      setImagePreview(newPreviews[0] || null);
    }
    
    // Remove corresponding file if it exists
    if (index < selectedFiles.length) {
      setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  const setPrimaryImage = (index: number) => {
    setImagePreview(imagePreviews[index]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Product Name*
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Type*
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => {
              const newType = e.target.value as 'laptop' | 'accessory';
              setType(newType);
              // Clear category when type is changed to laptop
              if (newType === 'laptop') {
                setCategory('');
              }
            }}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          >
            <option value="laptop">Laptop</option>
            <option value="accessory">Accessory</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="specs" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
          Specifications*
        </label>
        <textarea
          id="specs"
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
          rows={2}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="price" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Current Price*
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="₹0,000"
            className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
        </div>
        
        <div>
          <label htmlFor="originalPrice" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Original Price
          </label>
          <input
            type="text"
            id="originalPrice"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="₹0,000"
            className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label htmlFor="discount" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Discount %
          </label>
          <input
            type="number"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            min="0"
            max="100"
            placeholder="0"
            className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="condition" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Condition*
          </label>
          <select
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value as 'new' | 'used' | 'refurbished')}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          >
            <option value="used">Used</option>
            <option value="refurbished">Refurbished</option>
            <option value="new">New</option>
          </select>
        </div>

        <div>
          <label htmlFor="availability" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Stock*
          </label>
          <select
            id="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value as 'in_stock' | 'out_of_stock' | 'limited')}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          >
            <option value="in_stock">In Stock</option>
            <option value="limited">Limited</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
      </div>



      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {type === 'accessory' && (
          <div>
            <label htmlFor="category" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., mouse, keyboard"
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        )}
        
        <div>
          <label htmlFor="warranty" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Warranty
          </label>
          <input
            type="text"
            id="warranty"
            value={warranty}
            onChange={(e) => setWarranty(e.target.value)}
            placeholder="e.g., 6 months, 1 year"
            className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="featured" className="ml-2 block text-xs font-medium text-gray-700 dark:text-gray-300">
            ⭐ Featured Product
          </label>
        </div>
      </div>

      {/* Laptop Detailed Specifications */}
      {type === 'laptop' && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            📋 Detailed Laptop Specifications
          </h3>
          <LaptopSpecsForm
            specs={detailedSpecs}
            onChange={setDetailedSpecs}
          />
        </div>
      )}

      {/* Free Gifts (Laptops only) */}
      {type === 'laptop' && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            🎁 Free Gifts with Laptop
          </h3>
          <FreeGiftForm
            gifts={freeGifts}
            onChange={setFreeGifts}
          />
        </div>
      )}

      {/* Laptop Condition Assessment (Laptops only) */}
      {type === 'laptop' && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            🔍 Laptop Condition Assessment
          </h3>
          <LaptopConditionForm
            condition={laptopCondition}
            onChange={setLaptopCondition}
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
          Product Images {imagePreviews.length > 0 && `(${imagePreviews.length}/10)`}
        </label>
        
        <div className="space-y-3">
          {/* Image Previews Grid */}
          {imagePreviews.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <div className="relative rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="h-20 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                      <img 
                        src={preview} 
                        alt={`Product preview ${index + 1}`} 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    
                                           {/* Primary image indicator */}
                       {imagePreview === preview && (
                         <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded text-[10px]">
                           P
                         </div>
                       )}
                       
                       {/* Remove button */}
                       <button 
                         type="button" 
                         onClick={() => removeImage(index)}
                         className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                         aria-label="Remove image"
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                         </svg>
                       </button>
                       
                       {/* Set as primary button */}
                       {imagePreview !== preview && (
                         <button 
                           type="button" 
                           onClick={() => setPrimaryImage(index)}
                           className="absolute bottom-1 left-1 bg-blue-500 text-white text-[10px] px-1 py-0.5 rounded hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                         >
                           Set P
                         </button>
                       )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-800 rounded border border-dashed border-gray-300 dark:border-gray-700">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">No images</p>
              </div>
            </div>
          )}
          
          {/* File Input */}
          {imagePreviews.length < 10 && (
            <div className="flex items-center justify-center">
              <label className={`flex items-center justify-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                {isUploading ? '🔄 Compressing...' : (imagePreviews.length > 0 ? 'Add More (Max 10)' : 'Upload Images (Max 10, Auto-compressed)')}
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>
          )}
          
          <p className="text-xs text-gray-500 text-center">
            JPG/PNG, max 50MB each (auto-compressed to 2MB). Max 10 images.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || isUploading}
          className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          {isLoading || isUploading ? (
            <>
              <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isUploading ? 'Uploading...' : 'Saving...'}
            </>
          ) : (
            'Save Product'
          )}
        </button>
      </div>
    </form>
  );
} 