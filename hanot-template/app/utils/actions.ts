"use server ";
import { FeeeF } from "feeef";

export const ff = new FeeeF({
  apiKey: "c43Yfd3bgolijJU3b3bx095vlfTrvnL94baZrd1",
  baseURL: "https://feeef.app/api/v1",
  cache: 10,
  // baseURL: "http://localhost:3333/api/v1",
});

export const fetchStore = async (subdomain: string | null) => {
  if (subdomain) {
    return await ff.stores.find({
      id: subdomain,
      by: "slug",
    });
  }

  return null;
};

export const fetchProducts = async (storeId: string | null) => {
  return await ff.products.list({
    params: {
      store_id: storeId,
    },
  });
};
