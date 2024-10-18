"use server";
import { fetchProducts, fetchStore } from "./utils/actions";
import { convertDartColorToCssNumber, cssColorToHslString, ProductEntity, StoreEntity } from "feeef";

import ProductSection from "./components/productsSection";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default async function Home() {
  const store: StoreEntity | null = await fetchStore();

  if (!store) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-bold">
        Store not found
      </div>
    );
  }

  const productsResponse = await fetchProducts(store.id!);
  if (!productsResponse) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-bold">
        Products not found
      </div>
    );
  }
  const { data: products }: { data: ProductEntity[] } = productsResponse;

  const style = {
    "--primary": cssColorToHslString(convertDartColorToCssNumber(store.decoration!.primary)),
    "--primary-foreground": cssColorToHslString(convertDartColorToCssNumber(store.decoration!.onPrimary!)),
  } as React.CSSProperties;

  return (
    // --primary: from store.primaryColor
    <div className="inside" style={style}>
      <Navbar store={store} />

      <div className="flex flex-col min-h-screen px-0 md:px-14">
        <div className="min-h-svh">
          {/* Navbar */}
          <div className="text-center my-8">
            {/* Main heading */}
            <h1 className="text-3xl font-bold text-black mb-2 relative inline-block">
              <span className="block">{store.title}</span>
              {/* Underline */}
              <span className="block w-full h-1 bg-blue-200 absolute bottom-0 left-0"></span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-center text-lg mt-2 w-full md:w-3/4 mx-auto">
              {store.description}
            </p>
          </div>
          <hr className="my-4 " />

          <ProductSection products={products} categories={store.categories} />
        </div>
      </div>
      <Footer store={store} />
    </div>
  );
}
