import { cache } from "react";

export const getProducts = cache(
  async ({
    page = 1,
    limit = 20,
    sortBy = "id",
    order = "asc",
    category,
    search,
  }) => {
    const skip = (page - 1) * limit;
    let url = `https://next-ecommerce-api.vercel.app/products?skip=${skip}&limit=${limit}`;

    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    const response = await fetch(url, {
      next: { revalidate: 60 }, // Revalidating every 60 seconds
    });
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  }
);


export const getProduct = cache(async (id) => {
  const response = await fetch(
    `https://next-ecommerce-api.vercel.app/products/${id}`,
    {
      next: { revalidate: 300 }, // Revalidating every 5 minutes
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
});


export const getCategories = cache(async () => {
  const response = await fetch(
    `https://next-ecommerce-api.vercel.app/categories`,
    {
      next: { revalidate: 3600 }, // Revalidating every hour
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
});
