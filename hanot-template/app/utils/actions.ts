"use server";

import { FeeeF, OrderEntity } from "feeef";
import { headers } from "next/headers";
import { cache } from "react";

const ff = new FeeeF({
  apiKey:
    process.env.FEEEF_API_KEY || "c43Yfd3bgolijJU3b3bx095vlfTrvnL94baZrd1",
  baseURL: "https://feeef.app/api/v1",
  cache: 10,
});

export const fetchStore = cache(async () => {
  try {
    const header = headers();
    const subdomain = header.get("x-subdomain");
    if (subdomain) {
      return await ff.stores.find({
        id: subdomain,
        by: "slug",
      });
    }
    return null;
  } catch (error) {
    console.error("Error fetching store:", error);
    return null;
  }
});

export const fetchProducts = cache(async (storeId: string | null) => {
  try {
    if (!storeId) return null;
    return await ff.products.list({
      params: {
        store_id: storeId,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
});

export const fetchProduct = cache(async (productId: string) => {
  try {
    return await ff.products.find({
      id: productId,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
});

export const sendOrder = async (data: OrderEntity) => {
  try {
    return await ff.orders.create({ data });
  } catch (error) {
    console.error("Error sending order:", error);
    return null;
  }
};
