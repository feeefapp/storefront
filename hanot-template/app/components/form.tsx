"use client";
import { ProductEntity, StoreEntity, VariantOptionType } from "feeef";
import React, { useState } from "react";
import Markdown from "react-markdown";
import RenderVariantGroup from "./variantGroup";

import cities from "../utils/cities";
import states from "../utils/states";
import { sendOrder } from "../utils/actions";
interface OrderData {
  customerName?: string | null;
  customerPhone: string;

  shippingAddress?: string | null;
  shippingCity?: string | null;
  shippingState?: string | null;
  shippingMethodId?: string | null;

  items: OrderItem[];
  subtotal: number;
  shippingPrice: number;
  total: number;
  discount: number;
  coupon?: string | null;
}
interface OrderItem {
  product: ProductEntity;

  quantity: number;
  variants: string[];
}

const OrderForm = ({
  store,
  product,
}: {
  store: StoreEntity;
  product: ProductEntity;
}) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    quantity: 1,
  });
  const [item, setItem] = useState<OrderItem>({
    product: product!,
    quantity: 1,
    variants: [""],
  });
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     const data: OrderData = {
       customerName: form.name,
       customerPhone: form.phone,
       shippingAddress: "",
       shippingCity: form.city,
       shippingState: form.state,
       shippingMethodId: "",
       items: [item],
       subtotal: 0,
       shippingPrice: 0,
       total: 0,
       discount: 0,
       coupon: "",
     };

    // Send order
    sendOrder(data);
    alert(`Order placed for ${item.quantity} item(s) by ${store.name}`);
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
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}{" "}
              {/* Add more cities here */}
            </select>
            <span className="pl-2 text-green-500">
              <i className="fas fa-city"></i>
            </span>
            <select name="cit" id=""></select>
          </div>
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
              {/* <ShippingForm
                shippingMethod={product.shippingMethod}
                store={store}
                shipping={shipping}
                setShipping={setShipping}
                sendOrder={sendOrder}
              /> */}

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
                    // onClick={() => {
                    //   cart.updateQuantity(product.id, item.quantity - 1);
                    //   setItem((prevItem) => ({
                    //     ...prevItem,
                    //     quantity:
                    //       prevItem.quantity > 1 ? prevItem.quantity - 1 : 1,
                    //   }));
                    // }}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-s-lg"
                  >
                    -
                  </button>
                  {/* <span className="px-3 py-1 ">{item.quantity}</span> */}
                  <button
                    aria-label="زيادة الكمية"
                    // onClick={() => {
                    //   cart.updateQuantity(product.id, item.quantity + 1);
                    //   // Increase quantity
                    //   setItem((prevItem) => ({
                    //     ...prevItem,
                    //     quantity: prevItem.quantity + 1,
                    //   }));
                    // }}
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
                  aria-label="إضافة الى السلة"
                  onClick={() => {
                    // cart.add({
                    //   quantity: item.quantity,
                    //   price: getPriceAfterDiscount(),
                    //   variantPath: item.variants.join("/"),
                    //   product: product,
                    // });
                    // // update the ui
                    // setItem({ ...item });
                  }}
                  className="px-3 py-1 rounded-lg border-2 border-primary text-primary"
                >
                  إضافة إلى السلة
                </button>
                {/* ) : ( */}
                <button
                  aria-label="إزالة من السلة"
                  onClick={() => {
                    // cart.removeProduct(product.id);
                    // // update the ui
                    // setItem({ ...item });
                  }}
                  className="px-3 py-1 rounded-lg border-2 border-red-500 text-red-500"
                >
                  إزالة من السلة
                </button>
                {/* )} */}
              </div>
            </div>
            {/* divider */}
            <div className="flex items-center justify-center">
              <div className="h-[1px] bg-gray-200 dark:bg-gray-700 flex-grow"></div>

              <div className="text-gray-600 mx-4">ملخص الطلب</div>
              <div className="h-[1px] bg-gray-200 dark:bg-gray-700 flex-grow"></div>
            </div>
          </div>
          <Markdown className="p-4 prose dark:prose-invert">
            {product?.body}
          </Markdown>
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
