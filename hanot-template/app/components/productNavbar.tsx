import { StarIcon } from "@heroicons/react/outline";
import { ProductEntity, StoreEntity } from "feeef";
import Image from "next/image";
import Link from "next/link";

export default function ProductNavbar({
  product,
  store,
}: {
  product: ProductEntity;
  store: StoreEntity;
}) {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-around">
        {/* Left: Store Logo */}
        <div className="flex items-center">
          <Link className="text-2xl font-bold text-blue-600" href="/">
            <Image
              className="h-8 w-auto"
              src={store.logoUrl!} // Replace with actual logo path
              alt={store.name}
              width={100}
              height={100}
            />
          </Link>
        </div>

        {/* Center: Product Title and Rating */}
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-semibold">{product.name}</h1>
          <div className="flex items-center space-x-1">
            {/* Render 5-star rating */}
            {[...Array(5)].map((_, index) => (
              <StarIcon key={index} className="text-yellow-500" />
            ))}
          </div>
        </div>

        {/* Right: Product Price */}
        <div className="text-lg font-semibold text-blue-600">2,900 د.ج</div>
      </div>
    </nav>
  );
}
