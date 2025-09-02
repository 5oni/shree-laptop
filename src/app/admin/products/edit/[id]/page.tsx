import EditProductClient from './EditProductClient';

// Generate static params for static export
export async function generateStaticParams() {
  // For static export, we need to provide at least one static param
  // This will generate a placeholder page that handles dynamic behavior client-side
  return [
    { id: 'placeholder' }
  ];
}

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  return <EditProductClient productId={id} />;
}