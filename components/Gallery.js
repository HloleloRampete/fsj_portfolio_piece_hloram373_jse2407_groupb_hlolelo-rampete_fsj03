'use client'

import { useState } from 'react';

export default function Gallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="gallery">
      <div className="main-image">
        <img src={selectedImage} alt="Selected product" className="w-full h-auto" />
      </div>
      <div className="thumbnail-list flex space-x-2 mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(image)}
            className={`thumbnail cursor-pointer w-20 h-20 object-cover ${selectedImage === image ? 'border-2 border-blue-500' : 'border'}`}
          />
        ))}
      </div>
    </div>
  );
}