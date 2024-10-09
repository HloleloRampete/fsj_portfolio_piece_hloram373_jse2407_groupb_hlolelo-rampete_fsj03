"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";
import { getProducts, fetchProducts } from "../lib/api";
import PriceSorting from "./PriceSorting";
import CategoryFilter from "./CategoryFilter";

/**
 * ProductGrid Component
 *
 * This component displays a grid of product cards with pagination.
 * It fetches products based on the current page and handles page navigation.
 *
 * @param {Object} props - The component props
 * @param {number} props.totalPages - The total number of pages of products
 * @returns {JSX.Element} A div containing the product grid and pagination controls
 */
export default function ProductGrid({ initialProducts, initialTotal, initialCategories, initialFilters }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [products, setProducts] = useState(initialProducts || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalProducts, setTotalProducts] = useState(initialTotal || 1);
    const [categories, setCategories] = useState(initialCategories || []);
    const [filters, setFilters] = useState(initialFilters || {});
    const [isReset, setIsReset] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);
    const productsPerPage = 20;

    const currentPage = Number(searchParams.get("page")) || 1;
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "id";
    const order = searchParams.get("order") || "asc";

    const isFilterActive = useMemo(() => {
        return category !== "" || search !== "" || sortBy !== "id" || order !== "asc";
    }, [category, search, sortBy, order]);

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

        fetchProductsData({ search, category, sortBy, page });
    }, [searchParams]);

    async function fetchProductsData({ search, category, sortBy, page }) {
        try {
            setLoading(true);
            const skip = (page - 1) * productsPerPage;
            const data = await fetchProducts({
                limit: productsPerPage,
                skip,
                search,
                category,
                sortBy
            });
            setProducts(data.products || []);
            setTotalProducts(data.total || 0);
            setCategories(data.categories || []);
            setIsLastPage(data.products.length < productsPerPage);
        } catch (err) {
            setError("Failed to load products. Please try again later.");
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
        setTimeout(() => setIsReset(false), 100);
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-auto">
                    <CategoryFilter isReset={isReset} />
                </div>
                <div className="w-full sm:w-auto">
                    <PriceSorting isReset={isReset} />
                </div>
            </div>
            {isFilterActive && (
                <div className="flex flex-col md:flex-row justify-end items-end mb-6">
                    <button
                        onClick={resetFilters}
                        className="
                        px-6 py-2 
                        bg-teal-500 text-gray-100 
                        rounded-md 
                        transition-all duration-300 ease-in-out
                        transform hover:scale-105 hover:bg-teal-600 
                        active:scale-95 active:bg-teal-400
                        focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50
                        shadow-md hover:shadow-lg
                        "
                    >
                        Reset Filters
                    </button>
                </div>
            )}
            {products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-red-500 py-10">No products found.</div>
            )}
            <div className="flex justify-end mt-8">
                <Pagination
                    currentPage={filters.page}
                    totalProducts={totalProducts}
                    productsPerPage={productsPerPage}
                    onPageChange={handlePageChange}
                    isLastPage={isLastPage}
                />
            </div>
        </div>
    );
}
