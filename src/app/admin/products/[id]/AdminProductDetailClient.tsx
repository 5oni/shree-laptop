'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Product } from '@/types';
import { getProductById, deleteProduct, updateProduct } from '@/lib/services/supabaseService';
import AdminProtected from '@/components/AdminProtected';
import ProductForm from '@/components/admin/ProductForm';
import LaptopSpecsDisplay from '@/components/ui/LaptopSpecsDisplay';

interface AdminProductDetailClientProps {
  productId: string;
}

export default function AdminProductDetailClient({ productId }: AdminProductDetailClientProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);
        const fetchedProduct = await getProductById(productId);
        if (!fetchedProduct) {
          setError('Product not found.');
          return;
        }
        setProduct(fetchedProduct);
        setCurrentImageIndex(0); // Reset image index when product changes
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        await deleteProduct(productId);
        router.push('/admin/products');
      } catch (err) {
        console.error('Failed to delete product:', err);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  const handleUpdate = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!product) return;
    try {
      const updated = await updateProduct(product.id, productData);
      setProduct(updated);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update product:', err);
      alert('Failed to update product. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <AdminProtected>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin h-12 w-12 border-4 border-primary-600 border-t-transparent rounded-full"></div>
        </div>
      </AdminProtected>
    );
  }

  if (error) {
    return (
      <AdminProtected>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The product you are looking for might not exist or an error occurred.
          </p>
          <Link href="/admin/products" className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
            Back to Products
          </Link>
        </div>
      </AdminProtected>
    );
  }

  if (!product) {
    return (
      <AdminProtected>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Product Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The product you are looking for does not exist.
          </p>
          <Link href="/admin/products" className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
            Back to Products
          </Link>
        </div>
      </AdminProtected>
    );
  }

  const allImages = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
  const displayImage = allImages[currentImageIndex];

  return (
    <AdminProtected>
      <div className="container mx-auto px-4 py-6">
        {/* Compact Breadcrumb */}
        <nav className="mb-4 text-xs text-gray-500 dark:text-gray-400">
          <Link href="/admin" className="hover:text-primary-600">Admin</Link> / <Link href="/admin/products" className="hover:text-primary-600">Products</Link> / <span className="text-gray-700 dark:text-gray-300">{product.name}</span>
        </nav>

        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Product ID: {product.id}</p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/products/${product.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-xs transition-colors"
            >
              👁️ View Public
            </Link>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition-colors"
            >
              🗑️ Delete
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Edit Product</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
            <ProductForm product={product} onSubmit={handleUpdate} isLoading={false} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image Gallery - Compact */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Product Images</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{currentImageIndex + 1} of {allImages.length}</span>
                </div>
                
                {/* Main Image with Navigation */}
                <div className="relative bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden mb-3">
                  <div className="aspect-video flex items-center justify-center p-4">
                    {displayImage ? (
                      <img
                        src={displayImage}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-gray-400 text-center">
                        <svg className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm">No Image</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Left/Right Navigation */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : allImages.length - 1)}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        aria-label="Previous image"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex(currentImageIndex < allImages.length - 1 ? currentImageIndex + 1 : 0)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        aria-label="Next image"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-12 rounded border-2 overflow-hidden transition-all ${
                          index === currentImageIndex 
                            ? 'border-primary-500 ring-2 ring-primary-200' 
                            : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Details - Compact */}
            <div className="space-y-4">
              {/* Basic Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Basic Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Price:</span>
                    <span className="font-semibold text-primary-600 dark:text-primary-400">{product.price}</span>
                  </div>
                  {product.originalPrice && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Original:</span>
                      <span className="text-gray-600 dark:text-gray-400 line-through">{product.originalPrice}</span>
                    </div>
                  )}
                  {product.discount && product.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Discount:</span>
                      <span className="text-red-600 dark:text-red-400 font-semibold">-{product.discount}%</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Type:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      product.type === 'laptop' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {product.type}
                    </span>
                  </div>
                  {product.condition && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Condition:</span>
                      <span className="capitalize text-gray-700 dark:text-gray-300">{product.condition}</span>
                    </div>
                  )}
                  {product.availability && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Stock:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        product.availability === 'in_stock' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : product.availability === 'limited'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {product.availability.replace('_', ' ')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Featured:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      product.featured 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {product.featured ? '⭐ Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              {(product.category || product.warranty) && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Additional Info</h3>
                  <div className="space-y-2 text-sm">
                    {product.category && (
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Category:</span>
                        <span className="text-gray-700 dark:text-gray-300">{product.category}</span>
                      </div>
                    )}
                    {product.warranty && (
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Warranty:</span>
                        <span className="text-gray-700 dark:text-gray-300">{product.warranty}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Specifications */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Specifications</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
                  {product.specs}
                </p>
              </div>

              {/* Detailed Laptop Specifications */}
              {product.type === 'laptop' && product.detailedSpecs && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Detailed Specifications</h3>
                  <LaptopSpecsDisplay specs={product.detailedSpecs} />
                </div>
              )}

              {/* Metadata */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Metadata</h3>
                <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Created:</span>
                    <span>{new Date(product.createdAt!).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Updated:</span>
                    <span>{new Date(product.updatedAt!).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Images:</span>
                    <span>{allImages.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminProtected>
  );
}
