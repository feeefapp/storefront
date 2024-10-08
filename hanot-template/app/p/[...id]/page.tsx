import OrderForm from "@/app/components/form";
import ProductNavbar from "@/app/components/productNavbar";
import { fetchProduct, fetchStore } from "@/app/utils/actions";
import { StoreEntity } from "feeef";
import React from "react";

async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await fetchProduct(id);
  const store: StoreEntity | null = await fetchStore();

  if (!store || product.storeId !== store.id) {
    return <div>Prduct not found</div>;
  }
  return (
    <div dir="rtl">
      <ProductNavbar store={store} product={product} />
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div>Gallery goes Here</div>
        <OrderForm store={store} product={product} />
      </div>
    </div>
  );
}

export default ProductPage;
