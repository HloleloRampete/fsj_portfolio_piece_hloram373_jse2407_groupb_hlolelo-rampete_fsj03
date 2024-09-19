export async function fetchProducts({ limit, skip, search, category, sortBy }) {
    try {
        const params = new URLSearchParams({
            limit: limit.toString(),
            skip: skip.toString(),
            ...(search && { q: search }),
            ...(category && { category }),
            ...(sortBy && { sort: sortBy }),
        });

        const res = await fetch(`https://next-ecommerce-api.vercel.app/products?${params}`);
        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        
        return {
            products: data.products,
            total: data.total,
            categories: data.categories, // Assuming the API returns available categories
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}