import { getProductById, getProducts } from '@/lib/services/supabaseService';
import AdminProductDetailClient from './AdminProductDetailClient';
import { notFound } from 'next/navigation';

// Generate static params for existing products (optional for SEO)
export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((product) => ({
      id: product.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// This page now supports both static generation and dynamic rendering
export default async function AdminProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  try {
    // Server-side data fetching
    const product = await getProductById(id);
    
    if (!product) {
      notFound();
    }
    
    return <AdminProductDetailClient productId={id} />;
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}
