// app/products/[id]/page.js
import { fetchProductById } from '@/lib/product/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import Gallery from '@/components/Gallery';

export default async function ProductPage({ params }) {
  const { id } = params;

  const product = await fetchProductById(id);

  if (!product) {
    return <div className="text-red-500">Failed to load product details.</div>;
  }

  const { title, description, price, images, rating } = product;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Render the Gallery component and pass the product images */}
      {images.length > 0 ? (
        <Gallery images={images} />
      ) : (
        <div>No images available for this product.</div>
      )}
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">Price: ${product.price}</p>
        </div>
      </div>
    </div>
  );
}
