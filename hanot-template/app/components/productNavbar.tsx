
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
    <nav className="bg-white shadow-sm py-2">
      <div className="max-w-screen-lg px-5 mx-auto flex items-center justify-between">
        {/* Left: Store Logo */}
        <div className="flex gap-5">
          <div className="flex items-center">
            <Link className="text-2xl font-bold text-blue-600" href="/">
              <Image
                className="h-16 w-auto"
                src={store.logoUrl!} // Replace with actual logo path
                alt={store.name}
                width={500}
                height={500}
              />
            </Link>
          </div>
          {/* gradient  transpenet -> black -> transpenet */}
          <span className="w-[1px]  h-16 inline-block" style={{background: 'linear-gradient(transparent, grey, transparent)'}}></span>
          {/* Center: Product Title and Rating */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-lg font-semibold">{product.name}</h1>
            <div className="flex items-center space-x-1 ">
              {/* Render 5-star rating */}
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`w-5 h-5 ${
                    index < 3 ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Product Price */}
        <div className="text-lg font-semibold text-blue-600">
          {product.price} د.ج
        </div>
      </div>
    </nav>
  );
}
