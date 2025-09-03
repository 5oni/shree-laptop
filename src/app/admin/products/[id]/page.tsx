import { getProducts } from '@/lib/services/supabaseService';
import AdminProductDetailClient from './AdminProductDetailClient';

// Generate static params for static export
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

export default async function AdminProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminProductDetailClient productId={id} />;
}
