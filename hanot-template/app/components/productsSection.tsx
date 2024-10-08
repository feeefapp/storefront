import { EmbaddedCategory, ProductEntity } from "feeef";


import ProductCard from "./productCard";

type Props = {
  products: ProductEntity[];
  categories?: EmbaddedCategory[];
};

function ProductSection({ products }: Props) {
 
  // }, [categories, products]);

  return (
    <div>
     
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSection;
