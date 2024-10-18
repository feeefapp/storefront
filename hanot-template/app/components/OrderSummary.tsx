import { CartService } from "feeef";
import React, { useEffect, useState } from "react"; // { useState }
import { ff } from "../utils/configs";
import states from "../utils/states";

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

  const [shippingAddressError, setShippingAddressError] = useState<string | null>(null);

  useEffect(() => {
    var fn = (cart: CartService) => {
      if (!cart.getShippingAddress()!.state) {
        setShippingAddressError("يرجى اختيار الولاية");
      } else {
        setShippingAddressError(null);
      }
    }
    ff.cart.addListener(fn);
    return () => {
      ff.cart.removeListener(fn);
    }
  }, [])

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md w-full max-w-md border border-gray-200">
      <h3 className="text-lg font-bold mb-2 flex items-center justify-center">
        <span className="me-2">🛒</span> ملخص الطلب
      </h3>

      {/* Product items list */}
      {ff.cart.getAll().map((item) => (
        <div
          key={item.product.id}
          className="flex border-b pb-2 mb-2"
        >
          {/* product photo */}
          <img
            src={item.product.photoUrl!}
            alt={item.product.name!}
            className="w-12 h-12 object-cover rounded-lg me-2"
          />
          <div className="w-full flex flex-col justify-center">
            {/* when long dotted */}
            <h4 className="text-sm font-semibold">
              {item.product.name}
            </h4>
            <div className="text-xs text-gray-500">x{item.quantity} - {item.variant}</div>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col text-sm text-gray-600">
              <span className="ml-2">{ff.cart.getItemTotal(item)}دج</span>
              {
                item.product.discount && (
                  <span className="line-through text-gray-400 text-xs">
                    {item.product.price * item.quantity}دج
                  </span>
                )
              }
            </div>
            <span className="h-7 flex justify-center items-center bg-primary text-white text-xs px-2 rounded-s-lg">
              x{item.quantity}
            </span>
            {/* delete */}
            <button
              className="bg-red-500 text-white text-xs px-2 h-7 rounded-e-lg "
              onClick={() => ff.cart.remove(item.product.id)}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12V17" style={{stroke:"currentcolor"}} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 12V17" style={{stroke:"currentcolor"}} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 7H20" style={{stroke:"currentcolor"}} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" style={{stroke:"currentcolor"}} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" style={{stroke:"currentcolor"}} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      ))}

      {/* Shipping Price */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>
          سعر التوصيل
          {
            ff.cart.getShippingAddress()!.state && (
              <span className="text-xs text-gray-400 mx-1">
                {/* state by code */}
                إلى {states[Number.parseInt(ff.cart.getShippingAddress()!.state!)].trim()}
              </span>
            )
          }
        </span>
        <span>{
          shippingAddressError ? <span className="text-red-500">{shippingAddressError}</span> :
            ff.cart.getShippingPrice() + " دج"
        } </span>
      </div>

      {/* Total Price */}
      <div className="flex justify-between text-lg font-bold text-blue-600">
        <span>السعر الإجمالي</span>
        <span>{ff.cart.getTotal()} دج</span>
      </div>

      {/* Order confirmation button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-lg mt-2"
        >
          انقر هنا لتأكيد الطلب 👆
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
