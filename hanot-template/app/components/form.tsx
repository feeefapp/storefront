"use client";
import {
  DeliveryStatus,
  OrderEntity,
  OrderStatus,
  PaymentStatus,
  ProductEntity,
  StoreEntity,
  VariantOptionType,  
} from "feeef";
import { FaPhone, FaUserAlt, FaHome, FaGlobe } from "react-icons/fa";
import React, { useState } from "react";

import RenderVariantGroup from "./variantGroup";

import cities from "../utils/cities";
import states from "../utils/states";
import { sendOrder } from "../utils/actions";

const OrderForm = ({
  store,
  product,
}: {
  store: StoreEntity;
  product: ProductEntity;
}) => {
  // get unique id for the order
  const orderId = Math.random().toString(36).substring(7);
  // Form State
  const [form, setForm] = useState({
    name: "",
    phone: "",
    state: "",
    city: "",
    quantity: 1,
  });
  interface LocalOrderItem {
    product: ProductEntity;
    variants: string[];
    quantity: number;
  }

  // pick the cities from the selected state by the index
  const [citiesList, setCitiesList] = useState<string[]>(cities[0]);

  const [item, setItem] = useState<LocalOrderItem>({
    product: product,
    variants: [],
    quantity: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Send order
    const data: OrderEntity = {
      id: orderId,
      customerName: form.name,
      customerPhone: form.phone,
      shippingCity: form.city,

      items: [
        {
          productId: product.id,
          productName: product.name!,
          quantity: form.quantity,
          price: product.price,
        },
      ],
      subtotal: product.price,
      shippingPrice: 0,
      total: product.price,
      storeId: store.id,
      metadata: {},
      status: OrderStatus.draft,
      paymentStatus: PaymentStatus.unpaid,
      deliveryStatus: DeliveryStatus.pending,
      discount: 0,

      createdAt: new Date(),
      updatedAt: new Date(),
    };
    sendOrder(data);
  };

  return (
    <div className="bg-white p-6 max-w-lg mx-auto border rounded-lg shadow-md border-blue-700">
      {/* Title */}
      <h2 className="text-lg font-bold mb-4 text-center text-gray-800">
        أضف معلوماتك في الأسفل للطلب 👇
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="relative flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ring-blue-500">
            <FaUserAlt className="text-gray-500 ml-2" aria-hidden="true" />
            <label htmlFor="fullName" className="sr-only">
              الاسم بالكامل
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="الاسم بالكامل"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full bg-transparent focus:outline-none text-right"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="relative flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ring-blue-500">
            <FaPhone className="text-gray-500 ml-2" aria-hidden="true" />
            <label htmlFor="phone" className="sr-only">
              رقم الهاتف
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="رقم الهاتف"
              value={form.phone}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full bg-transparent focus:outline-none text-right"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* State */}
          <div className="relative flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ring-blue-500">
            <FaGlobe className="text-blue-500 ml-2" aria-hidden="true" />
            <label htmlFor="state" className="sr-only">
              الولاية
            </label>
            <select
              id="state"
              name="state"
              value={form.state || "الولاية"}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, state: e.target.value }));
                setCitiesList(cities[states.indexOf(e.target.value)]);
              }}
              className="w-full bg-transparent focus:outline-none text-right"
              required
            >
              <option disabled value="الولاية">
                الولاية
              </option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div className="relative flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ring-blue-500">
            <FaHome className="text-gray-500 ml-2" aria-hidden="true" />
            <label htmlFor="city" className="sr-only">
              البلدية
            </label>
            <select
              id="city"
              name="city"
              value={form.city || "البلدية"}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, city: e.target.value }))
              }
              className="w-full bg-transparent focus:outline-none text-right"
              required
            >
              <option disabled value="البلدية">
                البلدية
              </option>
              {cities.map((city) => (
                <option key={city[0]} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quantity Selector and Add to Cart */}
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <label htmlFor="quantity" className="text-gray-600">
              الكمية
            </label>
            <div className="flex items-center bg-gray-200 text-gray-700 border-2 rounded-lg overflow-hidden">
              <button
                aria-label="تقليل الكمية"
                type="button"
                onClick={() =>
                  setItem((prevItem) => ({
                    ...prevItem,
                    quantity: Math.max(1, prevItem.quantity - 1),
                  }))
                }
                className="px-3 py-1 bg-gray-200 text-gray-700"
              >
                -
              </button>
              <span className="px-3 py-1">{item.quantity}</span>
              <button
                aria-label="زيادة الكمية"
                type="button"
                onClick={() =>
                  setItem((prevItem) => ({
                    ...prevItem,
                    quantity: prevItem.quantity + 1,
                  }))
                }
                className="px-3 py-1"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="submit"
            aria-label="إضافة الى السلة"
            className="px-4 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition"
          >
            إضافة إلى السلة
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
