import { fetchProducts } from '@/lib/api';
import ProductGrid from '@/components/ProductGrid';

export default async function HomePage({ searchParams }) {
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const productsPerPage = 20;
  const skip = (currentPage - 1) * productsPerPage;

  try {
    const { products, total, categories } = await fetchProducts({
      limit: productsPerPage,
      skip,
      search: searchParams.search,
      category: searchParams.category,
      sortBy: searchParams.sortBy
    });

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
        
        <ProductGrid 
          initialProducts={products}
          initialTotal={total}
          initialCategories={categories}
          initialFilters={{
            search: searchParams.search || '',
            category: searchParams.category || '',
            sortBy: searchParams.sortBy || '',
            page: currentPage
          }}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching initial products:', error);
    return <div className="text-red-500">Failed to load products. Please try again later.</div>;
  }
}