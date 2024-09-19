export async function fetchProducts({ limit, skip, search, category, sortBy }) {
  const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
      ...(search && { q: search }),
      ...(category && { category }),
      ...(sortBy && { sort: sortBy }),
  });

  const res = await fetch(`https://next-ecommerce-api.vercel.app/products?${params}`, { next: { revalidate: 60 } });
  if (!res.ok) {
      throw new Error('Failed to fetch products');
  }
  return res.json();
}

export async function fetchProductById(id) {
  const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) {
      throw new Error('Failed to fetch product');
  }
  return res.json();
}