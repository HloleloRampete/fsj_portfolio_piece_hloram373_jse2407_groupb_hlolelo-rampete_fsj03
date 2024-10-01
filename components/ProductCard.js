'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import Gallery from './Gallery';

export default function ProductCard({ product }) {
  const { id, title, description, price, images, rating, category } = product;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Link href={`/product/${id}`} passHref>
      <div className="border rounded-lg overflow-hidden shadow-md cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl">
        {/* Image with controls */}
        <div className="relative">
        {/* <Image
            src={images}
            alt={title}
            layout="fill"
            objectFit="contain"
            className="transition duration-300 hover:opacity-90"
          /> */}
          <Gallery images={images} />
          {/* {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
              >
                &#10094;
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
              >
                &#10095;
              </button>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-gray-300'
                    }`}
                  ></span>
                ))}
              </div>
            </>
          )} */}
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="font-bold text-lg mb-1 truncate">{title}</h2>
          <p className="text-gray-600 text-sm mb-2 truncate">{description}</p>
          <p className="text-sm text-gray-500 mb-2">Category: {category}</p>

          {/* Price */}
          <p className="text-gray-900 font-semibold text-lg">${price.toFixed(2)}</p>

          {/* Rating */}
          <div className="flex items-center mt-3">
            {/* Stars */}
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
                ★
              </span>
            ))}
            {/* Reviews count */}
            <span className="ml-2 text-sm text-gray-500">({rating} rating)</span>
          </div>
        </div>
      </div>
    </Link>
  );
}