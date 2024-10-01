export async function fetchProducts({ limit, skip, search, category, sortBy } = {}) {
    try {
      const params = new URLSearchParams();
      
      if (limit !== undefined) params.append('limit', limit.toString());
      if (skip !== undefined) params.append('skip', skip.toString());
      if (search) params.append('q', search);
      if (category) params.append('category', category);
      if (sortBy) params.append('sort', sortBy);
  
      const res = await fetch(`https://next-ecommerce-api.vercel.app/products?${params}`, { next: { revalidate: 60 } });
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await res.json();
      
      return {
        products: data,
        total: data.total,
        categories: data.categories,
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
  
  export async function fetchProductById(id) {
    try {
      const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`, { next: { revalidate: 60 } });
      if (!res.ok) {
        throw new Error('Failed to fetch product');
      }
      return res.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }