// lib/api.js
export async function fetchProductById(id) {
    try {
      const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch product');
      }
      const product = await res.json();
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null; // Return null if there’s an error
    }
  }
  