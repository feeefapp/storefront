import React from // { useState }
"react";

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

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  shippingPrice,
}) => {
  // Calculate the subtotal
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingPrice;

  return (
    <div className="p-4 bg-white rounded-md shadow-md w-full max-w-md">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <span className="mr-2">🛒</span> ملخص الطلب
      </h3>

      {/* Product items list */}
      {items.map((item) => (
        <div
          key={item.productId}
          className="flex justify-between border-b pb-2 mb-2"
        >
          <span>{item.productName}</span>
          <span className="flex items-center">
            <span className="ml-2">{item.price} دج</span>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
              x{item.quantity}
            </span>
          </span>
        </div>
      ))}

      {/* Shipping Price */}
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>سعر التوصيل</span>
        <span>{shippingPrice} دج</span>
      </div>

      {/* Total Price */}
      <div className="flex justify-between mt-4 text-lg font-bold text-blue-600">
        <span>السعر الإجمالي</span>
        <span>{total} دج</span>
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
