import { Product } from '@/types';
import * as supabaseService from './supabaseService';

// Delete an image from Supabase Storage
export const deleteProductImage = async (imageUrl: string): Promise<void> => {
  return await supabaseService.deleteProductImage(imageUrl);
};

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    return await supabaseService.getProducts();
  } catch (error) {
    console.error('Error getting products:', error);
    throw new Error('Failed to get products');
  }
};

// Get a product by ID
export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const product = await supabaseService.getProductById(id);
    return product || undefined;
  } catch (error) {
    console.error('Error getting product:', error);
    throw new Error('Failed to get product');
  }
};

// Create a new product
export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  try {
    return await supabaseService.createProduct(productData);
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
};

// Update a product
export const updateProduct = async (id: string, productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  try {
    return await supabaseService.updateProduct(id, productData);
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    // Get the product to check if we need to delete the image
    const product = await getProductById(id);
    
    if (product && product.image) {
      // Delete the product image
      await deleteProductImage(product.image);
    }
    
    // Delete the product from Supabase
    await supabaseService.deleteProduct(id);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
}; 