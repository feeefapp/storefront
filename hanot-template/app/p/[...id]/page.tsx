import dynamic from "next/dynamic";
import ProductNavbar from "@/app/components/productNavbar";
import { fetchProduct, fetchStore } from "@/app/utils/actions";
import { StoreEntity } from "feeef";
import Image from "next/image";
import React, { Suspense } from "react";
import Markdown from "react-markdown";
import Loader from "@/app/components/loder";

// Dynamically import components with suspense and no SSR
const OrderForm = dynamic(() => import("@/app/components/form"), {
  suspense: true,
  ssr: true,
  loading: () => <Loader />,
});

const ProductGallery = dynamic(
  () => import("@/app/components/productsGallery"),
  {
    suspense: true,
    ssr: true,
    loading: () => <Loader />,
  }
);

async function ProductPage({ params: { id } }: { params: { id: string } }) {
  try {
    // Fetch product and store data
    const product = await fetchProduct(id);
    const store: StoreEntity | null = await fetchStore();

    // Handle missing product or store
    if (!store || !product || product.storeId !== store.id) {
      return <div className="text-center text-lg py-10">Product not found</div>;
    }

    return (
      <div dir="rtl" className="bg-gray-50">
        {/* Store and Product Navigation */}
        <ProductNavbar store={store} product={product} />

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 max-w-screen-lg mx-auto ">
          {/* Left: Product Gallery */}
          <div className="md:sticky top-0 md:h-screen overflow-y-auto">
            <Suspense fallback={<Loader />}>
              <ProductGallery productImages={product.media} />
            </Suspense>
          </div>

          {/* Right: Product Details and Order Form */}
          <div className="flex flex-col items-center md:justify-center space-y-6">
            {/* Order Form */}
            <Suspense fallback={<Loader />}>
              <OrderForm store={store} product={product} />
            </Suspense>

            {/* Product Description */}
            {product.body && (
              <div className="prose prose-lg max-w-none text-xl ">
                <Markdown
                  components={{
                    img: ({ src, alt }) => (
                      <Suspense fallback={<Loader />}>
                        <Image
                          src={src!}
                          alt={alt || "Product Image"}
                          width={500}
                          height={500}
                          loading="lazy"
                          className="rounded-lg mx-auto"
                        />
                      </Suspense>
                    ),
                  }}
                >
                  {product.body}
                </Markdown>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="text-center text-lg py-10">Error loading product</div>
    );
  }
}

export default ProductPage;
