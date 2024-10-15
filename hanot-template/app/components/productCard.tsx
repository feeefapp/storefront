import React from "react";
import { ProductEntity } from "feeef";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/outline";

type Props = {
  product: ProductEntity;
};

function ProductCard({ product }: Props) {
  return (
    <Link href={`/p/${product.id}`} rel="preload"  type="font/woff2">
      <div
        dir="rtl"
        className="bg-white shadow-md w-60 rounded-lg overflow-hidden max-w-xs mx-auto"
      >
        {/* Product Image */}
        <div className="relative w-full h-64">
          <Image
            src={product.media[0]}
            alt={product.name!}
            fill
            className="object-contain" // Ensures entire image is visible
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Category */}
          <p className="text-gray-600 text-sm">{product.category?.name}</p>

          {/* Product Title */}
          <h6 className="text-xl font-bold text-gray-900 mt-2">
            {product.name}
          </h6>

          {/* Rating */}
          <div className="flex items-center mt-2 mb-4">
            {/* Render stars based on rating */}
            {Array.from({ length: 5 }, (_, index) => (
              <StarIcon
                key={index}
                className={`w-5 h-5 ${
                  index < 3 ? "text-yellow-500" : "text-gray-300"
                }`}
                fill="currentColor"
              />
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center">
            {/* Discounted Price */}
            <span className="text-2xl font-bold text-blue-600">
              {product.price} د.ج
            </span>
            {/* Old Price (if available) */}
            {product.discount !== 0 && (
              <span className="text-gray-500 line-through ml-4">
                {(product.discount ?? 0) + product.price} د.ج
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
