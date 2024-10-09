import { fetchProductById } from '@/lib/api';
import ProductDetails from '@/components/ProductDetails';

export async function generateMetadata({ params }) {
  try {
    const product = await fetchProductById(params.id)
    return {
      title: `${product.title} | MandoZA`,
      description: product.description,
    }
  } catch (error) {
    return {
      title: 'Product Not Found | MandoZA',
      description: 'The requested product could not be found.',
    }
  }
}

export default async function ProductPage({ params }) {
  const { id } = params;
  try {
    const product = await fetchProductById(id);
    return <ProductDetails product={product} />;
  } catch (error) {
    return <div className="text-red-500">Failed to load product details.</div>;
  }
}