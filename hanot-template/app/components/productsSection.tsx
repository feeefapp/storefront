"use client";
import { EmbaddedCategory, ProductEntity } from "feeef";

import React, { useEffect, useId, useState } from "react";
import ProductCard from "./productCard";

type Props = {
  products: ProductEntity[];
  categories: EmbaddedCategory[];
};

function ProductSection({ products, categories }: Props) {
  const uuid = useId();
  const [filteredProducts, setFilteredProducts] =
    useState<ProductEntity[]>(products);
  const [selectedCategory, setSelectedCategory] =
    useState<EmbaddedCategory | null>(null);
  console.log(categories);
  console.log(products);
  useEffect(() => {
    if (categories.length > 0) {
      const filtered = products.filter((product) => {
        return product.category?.name === selectedCategory?.name;
      });
      setFilteredProducts(filtered);
    }
  }, [categories, products]);

  return (
    <div>
      <div className="flex justify-center w-full">
        {categories.map((category) => (
          <button
            key={uuid}
            className={`${
              selectedCategory?.name === category.name
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-500"
            } px-4 py-2 mx-2 rounded-lg`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="flex w-full">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductSection;
