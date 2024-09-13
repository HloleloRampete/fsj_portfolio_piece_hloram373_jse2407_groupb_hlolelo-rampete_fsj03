'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProductDetails({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="p-6">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Products
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          {images && images.length > 0 ? (
            <div>
              <img 
                src={images[currentImageIndex]} 
                alt={`Product image ${currentImageIndex + 1}`}
                className="w-full h-64 object-contain mb-4"
              />
              {images.length > 1 && (
                <div className="flex justify-between">
                  <button onClick={handlePrevImage} className="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
                  <button onClick={handleNextImage} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
                </div>
              )}
            </div>
          ) : (
            <div>No images available for this product.</div>
          )}
        </div>

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
          <ul>
            {reviews.map((review, index) => (
              <li key={index} className="mb-6 p-4 border rounded">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold">{review.name}</p>
                  <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                </div>
                <p className="mb-2">{review.comment}</p>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet for this product.</p>
        )}
      </div>
    </div>
  );
}