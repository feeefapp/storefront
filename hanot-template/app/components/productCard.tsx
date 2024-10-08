import React from "react";
import { ProductEntity } from "feeef";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: ProductEntity;
};

function ProductCard({ product }: Props) {
  return (
    <Link href={`/p/${product.id}`}>
      <div
        dir="rtl"
        className="bg-white shadow-md w-60 rounded-lg overflow-hidden max-w-xs mx-auto"
      >
        {/* Product Image */}
        <div className="relative w-full h-56">
          <Image src={product.media[0]} alt={product.name!} fill />
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Category */}
          <p className="text-gray-600 text-sm">{product.category?.name}</p>

          {/* Product Title */}
          <h3 className="text-xl font-bold text-gray-900 mt-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mt-2 mb-4">
            {/* Render stars based on rating */}
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 ${
                  index < 3 ? "text-yellow-500" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.905c.97 0 1.371 1.24.588 1.81l-3.977 2.891a1 1 0 00-.364 1.118l1.519 4.674c.3.921-.755 1.688-1.539 1.118l-3.977-2.89a1 1 0 00-1.176 0l-3.977 2.89c-.783.57-1.838-.197L3.073 15.09c-.783-.57-.382-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.519-4.674z" />
              </svg>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center">
            {/* Discounted Price */}
            <span className="text-2xl font-bold text-blue-600">
              {product.price} د.ج
            </span>
            {/* Old Price (if available) */}
            {product.discount && (
              <span className="text-gray-500 line-through ml-4">
                {product.discount + product.price} د.ج
              </span>
            )}
          </div>

          {/* Buy Button */}
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            اشترى الآن
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
