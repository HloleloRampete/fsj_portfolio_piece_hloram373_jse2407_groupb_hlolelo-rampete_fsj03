// components/Pagination.js

'use client'
export default function Pagination({ currentPage, totalProducts, productsPerPage }) {
    const totalPages = Math.ceil(totalProducts / productsPerPage)

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(window.location.search)
        params.set('page', newPage)
        window.location.search = params.toString()
    }

}