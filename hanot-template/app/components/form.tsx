"use client";
import { ProductEntity, StoreEntity } from "feeef";
import React, { useState } from "react";

const OrderForm = ({
  store,
  product,
}: {
  store: StoreEntity;
  product: ProductEntity;
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Oum El Bouaghi");
  const [quantity, setQuantity] = useState(1);
  console.log(store, product);

  const handleQuantityChange = (change: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, such as redirecting to WhatsApp or an API request.
    alert(`Order placed for ${quantity} item(s) by ${name}`);
  };

  return (
    <div className="bg-white p-4 max-w-lg mx-auto border rounded-lg shadow-md border-blue-700">
      {/* Title */}
      <h2 className="text-lg font-bold mb-2 text-center">
        أضف معلوماتك في الأسفل للطلب 👇
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="الاسم بالكامل"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded focus:outline-none"
            />
            <span className="pl-2 text-purple-500">
              <i className="fas fa-user"></i>
            </span>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="رقم الهاتف"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-2 border rounded focus:outline-none"
            />
            <span className="pl-2 text-red-500">
              <i className="fas fa-phone"></i>
            </span>
          </div>
          <div className="flex items-center col-span-2">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none"
            >
              <option value="Oum El Bouaghi">أم البواقي</option>
              {/* Add more cities here */}
            </select>
            <span className="pl-2 text-green-500">
              <i className="fas fa-city"></i>
            </span>
          </div>
        </div>

        {/* Offers Section */}
        <div className="border-t pt-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">العروض</h3>
          <p>عند طلب 01 - توصيل مجاني</p>
          <p>عند طلب 02 - توصيل مجاني</p>
          <p>عند طلب 03 - توصيل مجاني + تخفيض!</p>

          {/* Quantity Selector */}
          <div className="flex justify-between items-center mt-4">
            <span className="font-semibold">الكمية</span>
            <div className="flex items-center">
              <button
                type="button"
                className="bg-gray-200 px-3 py-1 rounded"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                type="button"
                className="bg-gray-200 px-3 py-1 rounded"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded-lg my-2"
          >
            انقر هنا لتأكيد الطلب 👆
          </button>
          <button
            type="button"
            className="bg-green-500 text-white w-full py-2 rounded-lg"
            onClick={() =>
              window.open(
                `https://wa.me/?text=Order%20${quantity}%20item(s)%20from%20${name}`
              )
            }
          >
            انقر هنا للطلب عبر الواتساب
          </button>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-semibold mb-2 text-center">ملخص الطلب</h3>
          <div className="flex justify-between items-center">
            <span>حقيبة سفر بتصميم عصري</span>
            <span>د.ج 7900 × {quantity}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span>سعر التوصيل</span>
            <span>مجانا</span>
          </div>
          <div className="flex justify-between items-center mt-2 font-semibold">
            <span>السعر الاجمالي</span>
            <span>د.ج {7900 * quantity}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
