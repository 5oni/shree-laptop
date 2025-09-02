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

    const matchesType = filterType === 'all' || product.type === filterType;

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
        >
          Add New Product
        </Link>
      </div>

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
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="all">All Types</option>
          <option value="laptop">Laptops</option>
          <option value="accessory">Accessories</option>
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
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
                        {product.image && product.image.trim() !== '' ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 object-cover rounded"
                            onError={handleImageError}
                          />
                        ) : (
                          <div className="h-12 w-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded">
                            <span className="text-xs text-gray-500 dark:text-gray-400">No Image</span>
                          </div>
                        )}
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
      )}

      {/* Inline Edit Form */}
      {isEditing && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Product</h2>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ProductForm 
              product={editingProduct} 
              onSubmit={handleUpdate} 
              isLoading={false}
            />
          </div>
        </div>
      )}
    </div>
  );
} 