// components/ProductCard.js

import Link from "next/link";

export default function ProductCard({ product }) {
    const {title, discription, price, image, rating } = product;

    return (
    <Link href={`/products/${product.id}`} passHref>
      <div className="border rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-lg">
        <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="font-bold text-xl mb-2 truncate">{product.title}</h2>
          <p className="text-gray-700 text-base mb-2 truncate">{product.description}</p>
          <p className="text-gray-900 font-bold">${product.price.toFixed(2)}</p>
          <div className="flex items-center mt-2">
            {/* Display star rating */}
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < rating.rate ? 'text-yellow-500' : 'text-gray-300'}>
                ★
              </span>
            ))}
            <span className="ml-2 text-gray-500">({rating.count} reviews)</span>
          </div>
        </div>
      </div>
    </Link>
    );
  }