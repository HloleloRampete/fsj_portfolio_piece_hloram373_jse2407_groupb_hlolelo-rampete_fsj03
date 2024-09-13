'use client';

import { useState } from 'react';
import Gallery from '@/components/Gallery';

export default function ProductDetails({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { title, description, price, images, rating } = product;

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images && images.length > 0 ? (
          <div>
            <img 
              src={images[currentImageIndex]} 
              alt={`Product image ${currentImageIndex + 1}`}
              className="w-full h-64 object-cover mb-4"
            />
            <div className="flex justify-between">
              <button onClick={handlePrevImage} className="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
              <button onClick={handleNextImage} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
            </div>
          </div>
        ) : (
          <div>No images available for this product.</div>
        )}
        <div>
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-gray-700 mb-4">{description}</p>
          <p className="text-xl font-semibold mb-4">Price: ${price}</p>
          {rating && (
            <div className="flex items-center mt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < rating.rate ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
              <span className="ml-2 text-sm text-gray-500">({rating.count} reviews)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}