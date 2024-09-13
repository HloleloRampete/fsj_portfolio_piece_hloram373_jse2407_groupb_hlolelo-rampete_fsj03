import { fetchProducts } from '@/lib/products/api';
import ProductGrid from '@/components/ProductGrid';
import Pagination from '@/components/Pagination';

export default async function HomePage({ searchParams }) {
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const productsPerPage = 20;
  const skip = 0;

  // Fetch products with skip
  const { products, total } = await fetchProducts(productsPerPage, skip);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Centering the "Our Products" text */}
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
      
      <ProductGrid products={products} />
      
      <Pagination
        currentPage={currentPage}
        totalProducts={total}
        productsPerPage={productsPerPage}
      />
    </div>
  );
}
