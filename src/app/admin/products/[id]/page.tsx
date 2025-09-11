import { getProductById } from '@/lib/services/supabaseService';
import AdminProductDetailClient from './AdminProductDetailClient';
import { notFound } from 'next/navigation';

// This page is fully dynamic - no static generation
// All admin product pages are fetched at runtime
export default async function AdminProductDetailPage({ 
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
    
    return <AdminProductDetailClient productId={id} />;
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}
