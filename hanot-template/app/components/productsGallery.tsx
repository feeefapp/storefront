"use client";
import { useState, useId } from "react";
import Image from "next/image";
import { PhotoView,PhotoProvider } from 'react-photo-view';
import "react-photo-view/dist/react-photo-view.css";

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
    <PhotoProvider>
      <div className="flex flex-col items-center rounded-xl">
        {/* Main Image */}
        <div className="relative aspect-square w-full mb-5">
          <PhotoView src={productImages[index]}>
            <Image
              src={productImages[index]}
              alt={`عرض صورة المنتج ${index + 1}`}
              fill
              sizes="50vw"
              className="object-cover rounded-xl  transition-transform duration-300 hover:scale-90" // Zoom effect on hover
              priority={true} // Load main image first
            />
          </PhotoView>
        </div>

        {/* Thumbnails */}
        <div
          className="w-full flex justify-center items-center gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch" }} // Enable smooth scrolling on iOS
        >
          {productImages.map((item, i) => (
            <div
              className={`relative w-20 h-20 sm:w-24 sm:h-24 aspect-square cursor-pointer rounded-2xl snap-center 
            ${
              index === i ? "border-4 border-primary p-2" : "opacity-75"
            } hover:opacity-100  transition-all duration-300`} // Improved thumbnail highlight
              key={`${id}-${i}`}
              onClick={() => handleClick(i)}
              aria-label={`تغيير إلى صورة المنتج ${i + 1}`} // Added aria-label for accessibility
            >
              <Image
                src={item}
                alt={`صورة مصغرة للمنتج ${i + 1}`}
                fill
                sizes="10vw"
                className="object-cover rounded-xl transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </PhotoProvider>
  );
};

export default ProductGallery;
