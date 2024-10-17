import { CartService } from "feeef";
import React, { useEffect, useState } from "react"; // { useState }
import { ff } from "../utils/configs";

interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  items: OrderItem[]; // Array of items in the order
  shippingPrice: number; // Shipping price
}

const OrderSummary: React.FC<OrderSummaryProps> = () => {

  const [cart, setCart] = useState<CartService>(ff.cart);

  useEffect(() => {
    var fn = (cart: CartService) => {
      setCart(cart);
    }
    cart.addListener(fn);
    return () => {
      cart.removeListener(fn);
    }
  }, [])

  return (
    <div className="p-4 bg-white rounded-md shadow-md w-full max-w-md">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <span className="mr-2">🛒</span> ملخص الطلب
      </h3>

      {/* Product items list */}
      {cart.getAll().map((item) => (
        <div
          key={item.product.id}
          className="flex justify-between border-b pb-2 mb-2"
        >
          <span>{item.product.id}</span>
          <span className="flex items-center">
            <span className="ml-2">{cart.getItemTotal(item)} دج</span>
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-md">
              x{item.quantity}
            </span>
          </span>
        </div>
      ))}

      {/* Shipping Price */}
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>سعر التوصيل</span>
        <span>{cart.getShippingPrice()} دج</span>
      </div>

      {/* Total Price */}
      <div className="flex justify-between mt-4 text-lg font-bold text-blue-600">
        <span>السعر الإجمالي</span>
        <span>{cart.getTotal()} دج</span>
      </div>

      {/* Order confirmation button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-lg my-2"
        >
          انقر هنا لتأكيد الطلب 👆
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
