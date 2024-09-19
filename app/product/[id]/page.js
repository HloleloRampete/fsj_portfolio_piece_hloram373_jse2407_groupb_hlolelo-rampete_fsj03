import { fetchProductById } from '@/lib/product/api';
import ProductDetails from '@/components/ProductDetails';
import { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await fetchProductById(params.id)
  return {
    title: `${product.title} | MandoZA`,
    description: product.description,
  }
}

export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await fetchProductById(id);

  if (!product) {
    return <div className="text-red-500">Failed to load product details.</div>;
  }

  return <ProductDetails product={product} />;
}