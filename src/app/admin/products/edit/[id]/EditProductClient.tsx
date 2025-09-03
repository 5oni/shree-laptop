'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import ProductForm from '@/components/admin/ProductForm';
import { getProductById, updateProduct } from '@/lib/services/productService';

interface EditProductClientProps {
  productId: string;
}

export default function EditProductClient({ productId }: EditProductClientProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [error, setError] = useState('');

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Skip fetching if productId is empty (placeholder case)
        if (!productId || productId === 'placeholder') {
          setIsLoadingProduct(false);
          return;
        }
        
        const foundProduct = await getProductById(productId);
        
        if (!foundProduct) {
          setError('Product not found');
        } else {
          setProduct(foundProduct);
        }
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setIsLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!product) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Update the product
      await updateProduct(product.id, productData);
      
      // Redirect to products list
      router.push('/admin/products');
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProduct) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Handle placeholder case for static export
  if (!productId || productId === 'placeholder') {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 p-6 rounded-lg">
        <h1 className="text-xl font-bold mb-2">Edit Product</h1>
        <p>Please navigate to a specific product to edit it.</p>
        <button
          onClick={() => router.push('/admin/products')}
          className="mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors"
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-6 rounded-lg">
        <h1 className="text-xl font-bold mb-2">Error</h1>
        <p>{error}</p>
        <button
          onClick={() => router.push('/admin/products')}
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 p-6 rounded-lg">
        <h1 className="text-xl font-bold mb-2">Product Not Found</h1>
        <p>The product you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => router.push('/admin/products')}
          className="mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <ProductForm product={product} onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
