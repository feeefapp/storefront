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
import OrderSummary from "./OrderSummary";

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
    <div className="bg-white p-4 border rounded-xl shadow-md border-primary">
      {/* Title */}
      <h2 className="text-lg font-bold mb-2 text-center">
        أضف معلوماتك في الأسفل للطلب 👇
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Full Name */}
          <div className="relative flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ring-blue-500">
            <FaUserAlt className="text-primary ml-2" aria-hidden="true" />
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
          <div className="relative flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ring-blue-500">
            <FaPhone className="text-primary ml-2" aria-hidden="true" />
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

        <div className="grid grid-cols-2 gap-3">
          {/* State */}
          <div className="relative flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ring-primary">
            <FaGlobe className="text-primary ml-2" aria-hidden="true" />
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
          <label
            htmlFor="city"
            className="relative flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ring-primary"
          >
            <FaHome className="text-primary ml-2" aria-hidden="true" />
            <span className="sr-only">البلدية</span>
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
              {citiesList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Offers Section */}
        <div className="product-color">
          {product?.variant && (
            <div className="gb p-4 rounded-xl">
              <h2 className="text-xl font-semibold">الخيارات المتوفرة</h2>
              <div className="h-2"></div>
              {/* variant groups */}
              <RenderVariantGroup
                variantGroup={product!.variant!}
                path={item.variants}
                onPathChange={(path) => {
                  if (item.variants.join() == path.join()) {
                    // delete last variant
                    path.pop();
                  }
                  item.variants = path;

                  // cart.updateVariantPath(product.id, path.join("/"));

                  return setItem({ ...item });
                }}
                onSelect={(variant) => {
                  // console.log(variant!.value)

                  if (variant?.type == VariantOptionType.image) {
                    const mediaIndex = product?.media.findIndex(
                      (media) => media == variant!.value
                    );

                    const el = document.getElementById(
                      `slide-${mediaIndex! + 1}`
                    );
                    el?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                      inline: "center",
                    });

                    // setSelectedMediaIndex(mediaIndex!);

                    // if (!import.meta.env.SSR) {
                    //     // href={`#slide-${index + 1}`}
                    //     window.history.pushState({}, "", `#slide-${mediaIndex}`);
                    // }
                  }

                  // ViewContent
                  // track("ViewContent", {
                  //   content_name: product?.name + " " + variant?.name,
                  //   // content_category: 'cloth',
                  //   content_ids: [product?.id],
                  //   content_type: "product",
                  //   value: 55 ,
                  //   currency: "DZD",
                  // });
                }}
              />
            </div>
          )}
          {/* name, phone, country|state */}
          <div className="h-4"></div>
          <div id="order-form" className="gb rounded-xl">
            <div className="p-4">
              <div className="h-2"></div>
              <div
                // ref={sendOrderButtonRef}
                className="pulse rounded-lg flex flex-col md:flex-row justify-between items-center"
              >
                {/* <SendOrderButton id="fixed" /> */}
              </div>
              <div className="h-2"></div>
              <div className="flex items-center justify-center">
                <div className="text-gray-600">الكمية</div>
                <div className="flex-grow"></div>
                <div className="flex items-center bg-gray-200 text-gray-700 justify-center border-2 rounded-lg overflow-hidden">
                  <button
                    aria-label="تقليل الكمية"
                    onClick={() => {
                      //   cart.updateQuantity(product.id, item.quantity - 1);
                      setItem((prevItem) => ({
                        ...prevItem,
                        quantity:
                          prevItem.quantity > 1 ? prevItem.quantity - 1 : 1,
                      }));
                    }}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-s-lg"
                    type="button"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 ">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label="زيادة الكمية"
                    onClick={() => {
                      //   cart.updateQuantity(product.id, item.quantity + 1);
                      //   // Increase quantity
                      setItem((prevItem) => ({
                        ...prevItem,
                        quantity: prevItem.quantity + 1,
                      }));
                    }}
                    className="px-3 py-1 "
                  >
                    +
                  </button>
                </div>
                {/* add to cart */}
                <div className="w-2"></div>
                {/* {!cart.canAddProduct(product) ? null : !cart.hasProduct( */}
                {/* product.id */}
                {/* ) ? ( */}
                <button
                  type="button"
                  aria-label="إضافة الى السلة"
                  onClick={() => {
                    // cart.add({
                    //   quantity: item.quantity,
                    //   price: getPriceAfterDiscount(),
                    //   variantPath: item.variants.join("/"),
                    //   product: product,
                    // });
                    // // update the ui
                    setItem({ ...item });
                  }}
                  disabled={
                    // !cart.canAddProduct(product) ||
                    // cart.hasProduct(product.id)
                    false
                  }
                  className="px-3 py-1 rounded-lg border-2 border-primary text-primary"
                >
                  إضافة إلى السلة
                </button>
                {/* ) : ( */}

                {/* )} */}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}

        {/* Order Summary */}

        {/* divider */}
        <div className="flex items-center justify-center">
          <div className="h-[1px] bg-gray-200 dark:bg-gray-700 flex-grow"></div>
          <OrderSummary
            items={[
              {
                productId: product.id,
                productName: product.name!,
                quantity: form.quantity,
                price: product.price,
              },
            ]}
            shippingPrice={0}
          />
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
