import { fetchProductById } from '@/lib/products/api'

export default async function ProductPage({ params }) {
  const product = await fetchProductById(params.id)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} className="w-64 h-64 object-contain mb-4" />
      <p className="text-gray-700">{product.description}</p>
      <p className="mt-4 text-xl font-semibold">${product.price}</p>
    </div>
  )
}
