'use client';

import Link from 'next/link';
import Gallery from '@/components/Gallery';

export default function ProductDetails({ product }) {
  const { 
    title, 
    description, 
    price, 
    images, 
    rating, 
    category, 
    tags, 
    stock, 
    reviews 
  } = product;

  return (
    <div className="p-6">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Products
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <Gallery images={images} />

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-gray-700 mb-4">{description}</p>
          <p className="text-2xl font-semibold mb-4">Price: ${price.toFixed(2)}</p>
          <p className="mb-2">Category: {category}</p>
          <p className="mb-2">Tags: {tags.join(', ')}</p>
          <p className="mb-4">Stock: {stock > 0 ? `${stock} available` : 'Out of stock'}</p>
          
          {/* Rating */}
          {rating && (
            <div className="flex items-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
              <span className="ml-2 text-sm text-gray-500">({rating} rating)</span>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {reviews && reviews.length > 0 ? (
          <ul className="space-y-6">
            {reviews.map((review, index) => (
              <li key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{review.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No reviews yet for this product.</p>
        )}
      </div>
    </div>
  );
}