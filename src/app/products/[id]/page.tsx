import { getProductById } from '@/lib/services/supabaseService';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

// This page is fully dynamic - no static generation
// All products are fetched at runtime, allowing real-time updates
export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  try {
    // Server-side data fetching at runtime
    const product = await getProductById(id);
    
    if (!product) {
      notFound();
    }
    
    return <ProductDetailClient productId={id} />;
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}
