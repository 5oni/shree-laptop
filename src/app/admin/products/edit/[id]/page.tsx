import { getProductById } from '@/lib/services/supabaseService';
import EditProductClient from './EditProductClient';
import { notFound } from 'next/navigation';

// This page is fully dynamic - no static generation
// All edit product pages are fetched at runtime
export default async function EditProductPage({ 
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
    
    return <EditProductClient productId={id} />;
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}
