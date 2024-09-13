"use client"

import { useState, useEffect } from 'react'
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import Pagination from './Pagination';
import { fetchProducts } from '@/lib/products/api';
import { useSearchParams } from 'next/navigation';

export default function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const productsPerPage = 20;  // Number of products to display per page

    const searchParams = useSearchParams();

    useEffect(() => {
        const page = parseInt(searchParams.get('page')) || 1;
        setCurrentPage(page);
        getProducts(page);
    }, [searchParams]);

    async function getProducts(page) {
        try {
            setLoading(true);
            const skip = (page - 1) * productsPerPage;
            const { products, total } = await fetchProducts(productsPerPage, skip);
            setProducts(products);
            setTotalProducts(total);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.message || 'An error occurred while fetching products');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(totalProducts / productsPerPage)) {
            setCurrentPage(newPage);
            
            // Update URL
            const params = new URLSearchParams(window.location.search);
            params.set('page', newPage.toString());
            window.history.pushState({}, '', `${window.location.pathname}?${params}`);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div>
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
                    currentPage={currentPage}
                    totalProducts={totalProducts}
                    productsPerPage={productsPerPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}