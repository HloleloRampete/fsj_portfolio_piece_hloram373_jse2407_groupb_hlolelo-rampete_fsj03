'use client'
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalProducts, productsPerPage }) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(window.location.search);
        params.set('page', newPage);
        window.location.search = params.toString();
    };

    const isLastPage = currentPage === totalPages;

    return (
        <div className="flex justify-center items-center space-x-2 my-8">
            {/* Previous page button */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
                aria-label="Previous page"
            >
                <ChevronLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-0.5 transition-transform duration-200 ease-in-out" />
                <span className="relative overflow-hidden">
                    <span className="inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-full">
                        Previous
                    </span>
                    <span className="absolute top-full left-0 inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-full">
                        Previous
                    </span>
                </span>
            </button>

            {/* Current page indicator */}
            <div className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">
                <span className="font-bold text-teal-600">{currentPage}</span>
            </div>

            {/* Next page button */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isLastPage}
                className="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
                aria-label="Next page"
            >
                <span className="relative overflow-hidden">
                    <span className="inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-full">
                        Next
                    </span>
                    <span className="absolute top-full left-0 inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-full">
                        Next
                    </span>
                </span>
                <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-0.5 transition-transform duration-200 ease-in-out" />
            </button>
        </div>
    );
}
