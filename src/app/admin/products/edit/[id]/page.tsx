import EditProductClient from './EditProductClient';

// Generate static params for static export
export async function generateStaticParams() {
  // Return empty array for static export - dynamic routes will be handled client-side
  return [];
}

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  // For static export, we'll let the client component handle the dynamic behavior
  const { id } = await params;
  return <EditProductClient productId={id} />;
}