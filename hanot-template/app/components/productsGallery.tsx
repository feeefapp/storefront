"use client";
import { useState, useId } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  productImages: string[];
}

const ProductGallery = ({ productImages }: ProductGalleryProps) => {
  const [index, setIndex] = useState(0);
  const id = useId();

  // Handle click to change image
  const handleClick = (i: number) => {
    setIndex(i);
  };

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto px-4 overflow-hidden">
      {/* Main Image */}
      <div className="h-[400px] sm:h-[500px] relative aspect-square w-full mb-4 hover:overflow-hidden">
        <Image
          src={productImages[index]}
          alt={`عرض صورة المنتج ${index + 1}`}
          fill
          sizes="50vw"
          className="object-contain rounded-lg  transition-transform duration-300 hover:scale-105" // Zoom effect on hover
        />
      </div>

      {/* Thumbnails */}
      <div
        className="w-full flex justify-center items-center gap-4 mt-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: "touch" }} // Enable smooth scrolling on iOS
      >
        {productImages.map((item, i) => (
          <div
            className={`relative w-20 h-20 sm:w-24 sm:h-24 aspect-square cursor-pointer rounded-lg snap-center 
            ${
              index === i ? "ring-4 ring-blue-500" : "opacity-75"
            } hover:opacity-100 transition-opacity duration-300`} // Improved thumbnail highlight
            key={`${id}-${i}`}
            onClick={() => handleClick(i)}
            aria-label={`تغيير إلى صورة المنتج ${i + 1}`} // Added aria-label for accessibility
          >
            <Image
              src={item}
              alt={`صورة مصغرة للمنتج ${i + 1}`}
              fill
              sizes="10vw"
              className="object-cover rounded-md transition-opacity duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
