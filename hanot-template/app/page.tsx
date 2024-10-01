"use server";
import { fetchProducts, fetchStore } from "./utils/actions";
import { ProductEntity, StoreEntity } from "feeef";
import { headers } from "next/headers";

import ProductSection from "./components/productsSection";

export default async function Home() {
  const header = headers();
  const subdomain = header.get("x-subdomain");

  const store: StoreEntity | null = await fetchStore(subdomain);

  if (!store) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-bold">
        Store not found
      </div>
    );
  }

  const { data: products }: { data: ProductEntity[] } = await fetchProducts(store.id!);
  

  return (
    <div className="">
      <ProductSection products={products} categories={store.categories} />
    </div>
  );
}
