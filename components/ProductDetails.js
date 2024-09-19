'use client';

import { useState } from 'react';
import Link from 'next/link';
import Gallery from '@/components/Gallery';

export default function ProductDetails({ product }) {
  const [reviewSort, setReviewSort] = useState('date');
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

  const sortedReviews = [...reviews].sort((a, b) => {
    if (reviewSort === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return b.rating - a.rating;
    }
  });

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-5xl mx-auto">
      <Link href="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block text-sm font-medium underline">
        &larr; Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <Gallery images={images} />

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
          <p className="text-lg leading-relaxed text-gray-600">{description}</p>
          <p className="text-3xl font-semibold text-gray-900">Price: ${price.toFixed(2)}</p>
          
          <div className="text-gray-700 space-y-2">
            <p>Category: <span className="font-medium text-gray-800">{category}</span></p>
            <p>Tags: <span className="font-medium text-gray-800">{tags.join(', ')}</span></p>
            <p>Stock: <span className={`font-medium ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stock > 0 ? `${stock} available` : 'Out of stock'}
            </span></p>
          </div>

          {/* Rating */}
          {rating && (
            <div className="flex items-center space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}>
                  ★
                </span>
              ))}
              <span className="text-gray-500 text-sm">({rating} rating)</span>
            </div>
          )}
        </div>
      </div>


      {/* Reviews Section */}
      <div className="mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
          <select
            value={reviewSort}
            onChange={(e) => setReviewSort(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
        {sortedReviews && sortedReviews.length > 0 ? (
          <ul className="space-y-6">
            {sortedReviews.map((review, index) => (
              <li key={index} className="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
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
