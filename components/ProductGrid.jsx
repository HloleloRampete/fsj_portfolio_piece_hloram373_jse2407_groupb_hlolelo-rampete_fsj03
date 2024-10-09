"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getProducts } from "../lib/api";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";
import PriceSort from "./PriceSort";
import CategoryFilter from "./CategoryFilter";

export default function ProductGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  // Get the current page from the URL query parameters
  const currentPage = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "id";
  const order = searchParams.get("order") || "asc";
  const limit = 20;

  // Check if any filter is active
  const isFilterActive = useMemo(() => {
    return (
      category !== "" || search !== "" || sortBy !== "id" || order !== "asc"
    );
  }, [category, search, sortBy, order]);

  // Fetch products whenever the filters, sorting, or pagination change
  useEffect(() => {
    fetchProducts();
  }, [currentPage, category, search, sortBy, order]);

  async function fetchProducts() {
    try {
      setLoading(true);
      const data = await getProducts({
        page: currentPage,
        limit,
        category,
        search,
        sortBy,
        order,
      });
      
      setProducts(data.products || []); // Use data.products if your API returns an object with products
      setTotalPages(Math.ceil(data.totalCount / limit)); // Ensure you handle total count from the API correctly
      setIsLastPage(currentPage === Math.ceil(data.totalCount / limit));
      setError(null);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  // Handle page changes
  const handlePageChange = (newPage) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", newPage.toString());
    router.push(`/?${currentParams.toString()}`);
  };

  // Reset filters
  const handleReset = () => {
    setIsReset(true);
    router.push("/");
    setTimeout(() => setIsReset(false), 100);
  };

  // Show loading spinner while fetching products
  if (loading) return <LoadingSpinner />;

  // Render error message instead of throwing
  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <CategoryFilter isReset={isReset} />
        </div>
        <div className="w-full sm:w-auto">
          <PriceSort isReset={isReset} />
        </div>
      </div>

      {isFilterActive && (
        <div className="flex flex-col md:flex-row justify-end items-end mb-6">
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-teal-500 text-gray-100 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-600 active:scale-95 active:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 shadow-md hover:shadow-lg"
          >
            <span className="flex items-center justify-center">
              <svg
                className="w-4 h-4 mr-2 transform rotate-0 transition-transform duration-300 ease-in-out group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset Filters
            </span>
          </button>
        </div>
      )}

      {products.length === 0 && !error ? (
        <div className="text-center text-red-500 py-10">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="flex justify-end mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLastPage={isLastPage}
        />
      </div>
    </div>
  );
}
