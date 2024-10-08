"use server ";
import { FeeeF } from "feeef";
import { headers } from "next/headers";

// We are creating a new instance of the FeeeF class. Think of it like a special tool that helps us talk to a website's API.
export const ff = new FeeeF({
  apiKey: "c43Yfd3bgolijJU3b3bx095vlfTrvnL94baZrd1", // This is like a secret password that lets us use the API.
  baseURL: "https://feeef.app/api/v1", // This is the address of the API we want to talk to.
  cache: 10, // This means we want to remember the API responses for 10 milliseconds.
  // baseURL: "http://localhost:3333/api/v1", // This is another address we could use if we were testing locally.
});

// This function fetches the store.
export const fetchStore = async () => {
  const header = headers(); // We get the headers from the request.
  const subdomain = header.get("x-subdomain"); // We look for a special piece of information called "x-subdomain".
  if (subdomain) {
    // If we find the subdomain...
    return await ff.stores.find({
      id: subdomain, // We use the subdomain to find the store.
      by: "slug", // We are looking for the store by its "slug" (a unique name).
    });
  }

  return null; // If we don't find the subdomain, we return null (nothing).
};

// This function fetches a list of products for a specific store.
export const fetchProducts = async (storeId: string | null) => {
  return await ff.products.list({
    params: {
      store_id: storeId, // We use the store's ID to get the products.
    },
  });
};

// This function fetches information about a specific product.
export const fetchProduct = async (productId: string) => {
  return await ff.products.find({
    id: productId, // We use the product's ID to find it.
  });
};
