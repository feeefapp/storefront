"use client";
import React from //  { useContext }
"react";
import { ShoppingCartIcon, SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";

import { StoreEntity } from "feeef";
import Image from "next/image";
// import { CartContext } from "./context";

const Navbar = ({ store }: { store: StoreEntity }) => {
  // const { addToCart, cartItems } = useContext(CartContext);

  // console.log(cartItems);

  return (
    <header dir="rtl">
      {/* Black Banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        {store?.description}
        {/* <span className="text-blue-600">التوصيل مجاني للطلبات فوق 1000 د.ج</span> */}
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-around py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              className="h-8 w-auto"
              src={store.logoUrl!} // Replace with actual logo path
              alt={store.name}
              width={100}
              height={100}
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link href="#" className="text-gray-700 hover:text-blue-600">
              الرئيسية
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600">
              الشحن والتسليم
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600">
              طرق الدفع
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600">
              اتصل بنا
            </Link>
          </div>

          {/* Icons: Search and Cart */}
          <div className="flex items-center gap-6">
            <SearchIcon className="w-6 h-6 text-gray-500 cursor-pointer" />
            <div className="relative">
              <ShoppingCartIcon className="w-6 h-6 text-gray-500 cursor-pointer" />
              {/* Cart notification bubble */}
              <span className="absolute -top-2 right-0 inline-flex w-3 items-center justify-center  text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                0
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
