import Link from "next/link";

export default function ProductCard({ product }) {
  const { title, description, price, thumbnail, rating } = product;

  return (
    <Link href={`/product/${product.id}`} passHref>
      <div className="border rounded-lg overflow-hidden shadow-md cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl">
        {/* Image */}
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-contain transition duration-300 hover:opacity-90"
        />

        {/* Content */}
        <div className="p-4">
          <h2 className="font-bold text-lg mb-1 truncate">{title}</h2>
          <p className="text-gray-600 text-sm mb-2 truncate">{description}</p>

          {/* Price */}
          <p className="text-gray-900 font-semibold text-lg">${price.toFixed(2)}</p>

          {/* Rating */}
          <div className="flex items-center mt-3">
            {/* Stars */}
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < rating.rate ? 'text-yellow-400' : 'text-gray-300'}>
                ★
              </span>
            ))}
            {/* Reviews count */}
            <span className="ml-2 text-sm text-gray-500">({rating.count} reviews)</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
