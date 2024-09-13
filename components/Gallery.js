'use client'

import { useState } from 'react';

export default function Gallery({ images }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handlePrevious = () => {
    setSelectedImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!images || images.length === 0) {
    return <div className="text-center text-gray-500">No images available</div>;
  }

  return (
    <div className="gallery">
      <div className="main-image relative">
        <img 
          src={images[selectedImageIndex]} 
          alt={`Product image ${selectedImageIndex + 1}`} 
          className="w-full h-auto object-contain max-h-96"
        />
        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrevious} 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
            >
              &#10094;
            </button>
            <button 
              onClick={handleNext} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
            >
              &#10095;
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="thumbnail-list flex space-x-2 mt-4 overflow-x-auto">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              onClick={() => setSelectedImageIndex(index)}
              className={`thumbnail cursor-pointer w-20 h-20 object-cover ${selectedImageIndex === index ? 'border-2 border-blue-500' : 'border'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}