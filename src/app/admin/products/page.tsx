'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { getAllProducts, deleteProduct, updateProduct } from '@/lib/services/productService';
import ProductForm from '@/components/admin/ProductForm';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query and type
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.specs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesType = true;
    if (filterType === 'featured') {
      matchesType = product.featured === true;
    } else if (filterType === 'discounted') {
      matchesType = (product.discount && product.discount > 0) || false;
    } else if (filterType !== 'all') {
      matchesType = product.type === filterType;
    }

    return matchesSearch && matchesType;
  });

  // Delete product handler
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
      } catch (err) {
        console.error('Failed to delete product:', err);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  // Edit product handler
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  // Handle product update
  const handleUpdate = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingProduct) return;
    
    try {
      await updateProduct(editingProduct.id, productData);
      
      // Update the products list
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData, updatedAt: new Date().toISOString() }
          : p
      ));
      
      // Close edit mode
      setEditingProduct(null);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update product:', err);
      alert('Failed to update product. Please try again.');
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingProduct(null);
    setIsEditing(false);
  };

  // Handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElement = e.currentTarget;
    imgElement.style.display = 'none';
    
    const parentElement = imgElement.parentElement;
    if (parentElement) {
      parentElement.innerHTML = '<div class="h-12 w-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded"><span class="text-xs text-gray-500 dark:text-gray-400">No Image</span></div>';
    }
  };

  return (
    <div>
      {/* Header - Mobile responsive */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Products Management</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors text-center sm:text-left w-full sm:w-auto"
        >
          Add New Product
        </Link>
      </div>

      {/* Search and Filter - Mobile responsive */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full sm:w-auto"
        >
          <option value="all">All Types</option>
          <option value="laptop">Laptops</option>
          <option value="accessory">Accessories</option>
          <option value="featured">Featured</option>
          <option value="discounted">Discounted</option>
        </select>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          {/* Desktop Table View - Hidden on mobile */}
          <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Specs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-12 w-12 relative">
                          {(() => {
                            const allImages = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
                            const displayImage = allImages[0];
                            
                            return displayImage && displayImage.trim() !== '' ? (
                              <div className="relative">
                                <img
                                  src={displayImage}
                                  alt={product.name}
                                  className="h-12 w-12 object-contain rounded bg-gray-100 dark:bg-gray-700"
                                  onError={handleImageError}
                                />
                                {allImages.length > 1 && (
                                  <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {allImages.length}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="h-12 w-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded">
                                <span className="text-xs text-gray-500 dark:text-gray-400">No Image</span>
                              </div>
                            );
                          })()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                          {product.specs}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {product.price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.type === 'laptop'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {product.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 mr-4"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      No products found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View - Hidden on desktop */}
          <div className="md:hidden space-y-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  <div className="flex items-start gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 relative">
                        {(() => {
                          const allImages = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
                          const displayImage = allImages[0];
                          
                          return displayImage && displayImage.trim() !== '' ? (
                            <div className="relative">
                              <img
                                src={displayImage}
                                alt={product.name}
                                className="h-16 w-16 object-contain rounded bg-gray-100 dark:bg-gray-700"
                                onError={handleImageError}
                              />
                              {allImages.length > 1 && (
                                <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                  {allImages.length}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="h-16 w-16 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded">
                              <span className="text-xs text-gray-500 dark:text-gray-400">No Image</span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-grow min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 line-clamp-2">
                            {product.specs}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {product.price}
                            </span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              product.type === 'laptop'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            }`}>
                              {product.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-3">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors text-center"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleEdit(product)}
                          className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex-1 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
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
        </>
      )}

      {/* Inline Edit Form - Mobile responsive modal */}
      {isEditing && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold">Edit Product</h2>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <ProductForm 
                product={editingProduct} 
                onSubmit={handleUpdate} 
                isLoading={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 