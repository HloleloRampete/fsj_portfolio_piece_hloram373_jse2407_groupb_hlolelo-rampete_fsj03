import { fetchProductById } from '@/lib/product/api';
import ProductDetails from '@/components/ProductDetails';

export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await fetchProductById(id);

  if (!product) {
    return <div className="text-red-500">Failed to load product details.</div>;
  }

  return <ProductDetails product={product} />;
}