"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import Pagination from './Pagination';
import { fetchProducts } from '@/lib/api';

export default function ProductGrid({ initialProducts, initialTotal, initialCategories, initialFilters }) {
    const [products, setProducts] = useState(initialProducts);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalProducts, setTotalProducts] = useState(initialTotal);
    const [categories, setCategories] = useState(initialCategories);
    const productsPerPage = 20;

    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        const page = parseInt(searchParams.get('page')) || 1;
        const search = searchParams.get('search') || '';
        const category = searchParams.get('category') || '';
        const sortBy = searchParams.get('sortBy') || '';

        setFilters({
            search,
            category,
            sortBy,
            page
        });

        getProducts({ search, category, sortBy, page });
    }, [searchParams]);

    async function getProducts({ search, category, sortBy, page }) {
        try {
            setLoading(true);
            const skip = (page - 1) * productsPerPage;
            const { products, total, categories: fetchedCategories } = await fetchProducts({
                limit: productsPerPage,
                skip,
                search,
                category,
                sortBy
            });
            setProducts(products);
            setTotalProducts(total);
            setCategories(fetchedCategories);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.message || 'An error occurred while fetching products');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }

    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...filters, [filterType]: value, page: 1 };
        setFilters(newFilters);
        updateURL(newFilters);
    };

    const handlePageChange = (newPage) => {
        const newFilters = { ...filters, page: newPage };
        setFilters(newFilters);
        updateURL(newFilters);
    };

    const updateURL = (newFilters) => {
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) params.set(key, value.toString());
        });
        router.push(`?${params.toString()}`);
    };

    const resetFilters = () => {
        setFilters({ search: '', category: '', sortBy: '', page: 1 });
        router.push('/');
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="p-2 border rounded mr-4"
                />
                <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="p-2 border rounded mr-4"
                >
                    <option value="">All Categories</option>
                    {categories && categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="p-2 border rounded mr-4"
                >
                    <option value="">Sort By</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
                <button onClick={resetFilters} className="p-2 bg-gray-200 rounded">
                    Reset Filters
                </button>
            </div>

            {products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">No products found.</div>
            )}

            {totalProducts > productsPerPage && (
                <Pagination
                    currentPage={filters.page}
                    totalProducts={totalProducts}
                    productsPerPage={productsPerPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}